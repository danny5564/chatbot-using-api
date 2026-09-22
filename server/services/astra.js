// Configuration from environment variables with fallbacks
const EXPERIENTIAL_API_URL = process.env.EXPERIENTIAL_API_URL || 'https://platform.experientiallabs.ai/api/v1/chat/completions';
const EXPERIENTIAL_MODEL = process.env.EXPERIENTIAL_MODEL || 'gpt-3.5-turbo';

async function sendMessage(userMessage, history = []) {
  const apiKey = process.env.EXPERIENTIAL_API_KEY;
  // Trim any whitespace that might have been accidentally added
  const trimmedApiKey = apiKey?.trim() ?? apiKey;
  // Mask the API key for logging: show first 4 and last 4 characters
  const maskedKey = trimmedApiKey ? `${trimmedApiKey.slice(0, 4)}...${trimmedApiKey.slice(-4)}` : 'not set';
  console.log('API key present:', !!trimmedApiKey, '(masked:', maskedKey, ')');
  console.log('API key is placeholder:', trimmedApiKey === 'your_experiential_api_key_here');
  console.log('API key length:', trimmedApiKey?.length ?? 0);
  console.log('Using API URL:', EXPERIENTIAL_API_URL);
  console.log('Using model:', EXPERIENTIAL_MODEL);

  if (!trimmedApiKey || trimmedApiKey === 'your_experiential_api_key_here') {
    const err = new Error('API key not configured');
    err.status = 500;
    err.userMessage = 'The AI service is not configured. Please set your API key.';
    throw err;
  }

  // Use the trimmed API key for the request
  const apiKeyToUse = trimmedApiKey;

  // Convert chat history to the format expected by Experiential Labs API
  // This assumes OpenAI-compatible format - adjust based on actual API docs
  const messages = [];

  // Add system message if needed (adjust based on API requirements)
  // messages.push({ role: "system", content: "You are a helpful assistant." });

  // Add history
  for (const msg of history) {
    messages.push({
      role: msg.role,
      content: msg.content
    });
  }

  // Add current user message
  messages.push({
    role: "user",
    content: userMessage
  });

  let response;
  try {
    console.log('Making request to Experiential Labs API...');
    // Try different Authorization header formats
    const authMethods = [
      // Method 1: Bearer token in Authorization header (most common)
      {
        headers: { 'Authorization': `Bearer ${apiKeyToUse}`, 'Content-Type': 'application/json' },
        description: 'Bearer token'
      },
      // Method 2: Token as Authorization header (no Bearer)
      {
        headers: { 'Authorization': `${apiKeyToUse}`, 'Content-Type': 'application/json' },
        description: 'Token only'
      },
      // Method 3: Custom header X-API-Key
      {
        headers: { 'X-API-Key': `${apiKeyToUse}`, 'Content-Type': 'application/json' },
        description: 'X-API-Key header'
      },
      // Method 4: Custom header Authorization: Token
      {
        headers: { 'Authorization': `Token ${apiKeyToUse}`, 'Content-Type': 'application/json' },
        description: 'Token prefix'
      }
    ];

    // Try each authentication method until one works
    for (const [index, { headers, description }] of authMethods.entries()) {
      try {
        // Create a copy of headers for logging with the API key masked
        const safeHeaders = { ...headers };
        if (safeHeaders.Authorization) {
          safeHeaders.Authorization = safeHeaders.Authorization.replace(apiKeyToUse, '[REDACTED]');
        }
        if (safeHeaders['X-API-Key']) {
          safeHeaders['X-API-Key'] = safeHeaders['X-API-Key'].replace(apiKeyToUse, '[REDACTED]');
        }
        console.log(`Trying auth method ${index + 1}: ${description}`);
        console.log(`  URL: ${EXPERIENTIAL_API_URL}`);
        console.log(`  Headers:`, Object.keys(safeHeaders).map(k => `${k}: ${safeHeaders[k]}`).join(', '));
        const requestBody = JSON.stringify({
          model: EXPERIENTIAL_MODEL,
          messages: messages,
          max_tokens: 1000,
          temperature: 0.7
        });
        console.log('  Request body:', requestBody);
        response = await fetch(EXPERIENTIAL_API_URL, {
          method: 'POST',
          headers,
          body: requestBody,
        });
        console.log('Experiential Labs API response status:', response.status);
        if (response.ok) {
          console.log('Successfully connected with auth method', index + 1);
          break; // Success, exit the loop
        }
        // If not ok, continue to try next method
      } catch (formatErr) {
        console.log(`Method ${index + 1} failed with network error:`, formatErr.message);
        if (index === authMethods.length - 1) {
          throw formatErr; // Re-throw if last method
        }
      }
    }
  } catch (networkErr) {
    const err = new Error('Network error');
    err.status = 502;
    err.userMessage = 'Could not connect to the AI service. Please check your connection.';
    throw err;
  }

  if (!response.ok) {
    const status = response.status;
    let errorMsg = 'Unknown error';
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorData.error || `HTTP ${status}`;
    } catch (e) {
      errorMsg = `HTTP ${status}`;
    }

    const err = new Error(`Experiential Labs API error: ${errorMsg}`);
    err.status = status;

    // Provide more specific guidance based on status code
    switch (status) {
      case 400:
        err.userMessage = 'Invalid request. Please check your message and try again.';
        break;
      case 401:
        err.userMessage = 'Authentication failed. Please check your Experiential Labs API key.';
        break;
      case 429:
        err.userMessage = 'Too many requests. Please wait a moment and try again.';
        break;
      case 500:
        err.userMessage = 'The AI service experienced an internal error. Please try again later.';
        break;
      default:
        err.userMessage = 'Something went wrong while connecting to the AI service. Please try again.';
    }

    throw err;
  }

  const data = await response.json();
  console.log('Experiential Labs API response data:', JSON.stringify(data, null, 2));

  // Extract reply from response (adjust based on actual API response format)
  let reply = '';

  console.log('Attempting to extract reply from response data...');

  // Try multiple common response formats
  try {
    // Format 1: OpenAI-like { choices: [{ message: { content: "..." } }] }
    if (data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
      const firstChoice = data.choices[0];
      if (firstChoice.message && typeof firstChoice.message.content === 'string') {
        reply = firstChoice.message.content;
        console.log('Found reply in choices[0].message.content');
      } else if (firstChoice.text && typeof firstChoice.text === 'string') {
        reply = firstChoice.text;
        console.log('Found reply in choices[0].text');
      }
    }

    // Format 2: Direct text response
    if (!reply && typeof data.response === 'string') {
      reply = data.response;
      console.log('Found reply in response.response');
    }

    // Format 3: Text field at root
    if (!reply && typeof data.text === 'string') {
      reply = data.text;
      console.log('Found reply in response.text');
    }

    // Format 4: Generated text
    if (!reply && typeof data.generated_text === 'string') {
      reply = data.generated_text;
      console.log('Found reply in response.generated_text');
    }

    // Format 5: Results array
    if (!reply && Array.isArray(data.results) && data.results.length > 0) {
      const firstResult = data.results[0];
      if (typeof firstResult.text === 'string') {
        reply = firstResult.text;
        console.log('Found reply in results[0].text');
      } else if (firstResult.message && typeof firstResult.message === 'string') {
        reply = firstResult.message;
        console.log('Found reply in results[0].message');
      }
    }

    // Format 6: Output array (similar to what we had before)
    if (!reply && data.output && Array.isArray(data.output)) {
      for (const item of data.output) {
        if (item.type === 'message' && Array.isArray(item.content)) {
          for (const block of item.content) {
            if (block.type === 'output_text' && typeof block.text === 'string') {
              reply += block.text;
              console.log('Found reply in output array');
            }
          }
        }
        // Also check for direct text in output items
        if (item.text && typeof item.text === 'string') {
          reply += item.text;
          console.log('Found reply in output.item.text');
        }
      }
    }

    // Format 7: Message array
    if (!reply && Array.isArray(data.messages) && data.messages.length > 0) {
      const lastMessage = data.messages[data.messages.length - 1]; // Often the last is the assistant's reply
      if (lastMessage.content && typeof lastMessage.content === 'string') {
        reply = lastMessage.content;
        console.log('Found reply in messages array');
      }
    }

    // Format 8: Direct content in root (some APIs return { content: "..." } directly)
    if (!reply && typeof data.content === 'string') {
      reply = data.content;
      console.log('Found reply in response.content');
    }

    // Format 9: Experiential Labs specific format based on documentation
    // Check if it's a streaming response or has a different structure
    if (!reply && data.choices && Array.isArray(data.choices)) {
      for (const choice of data.choices) {
        if (choice.message && choice.message.content) {
          reply += choice.message.content;
        }
      }
    }
  } catch (extractError) {
    console.log('Error while extracting reply:', extractError.message);
  }

  // If we still don't have a reply, log the full response for debugging
  if (!reply) {
    console.log('Could not extract reply from response. Full response:', JSON.stringify(data, null, 2));
    reply = 'I received your message but could not generate a response. Please try again.';
  }

  return reply;
}

module.exports = { sendMessage };