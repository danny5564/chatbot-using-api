const fetch = require('node-fetch');
require('dotenv').config();

const KIE_API_URL = 'https://api.kie.ai/codex/v1/responses';
const apiKey = process.env.KIE_API_KEY?.trim();

console.log('API Key (first/last 4 chars):', apiKey ? `${apiKey.slice(0,4)}...${apiKey.slice(-4)}` : 'None');
console.log('API Key length:', apiKey?.length || 0);

const testRequest = async (authHeaderValue, headerName = 'Authorization') => {
  try {
    console.log(`\nTesting with ${headerName}: ${authHeaderValue ? '<present>' : 'None'}`);
    const response = await fetch(KIE_API_URL, {
      method: 'POST',
      headers: {
        [headerName]: authHeaderValue,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-6-astra',
        input: [{ role: 'user', content: [{ type: 'input_text', text: 'Hello' }] }],
        stream: false
      })
    });
    
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    return { status: response.status, data };
  } catch (error) {
    console.log('Error:', error.message);
    return { error: error.message };
  }
};

(async () => {
  console.log('=== Testing different auth methods ===');
  
  // Method 1: Bearer token
  await testRequest(`Bearer ${apiKey}`, 'Authorization');
  
  // Method 2: Token only
  await testRequest(apiKey, 'Authorization');
  
  // Method 3: Custom header
  await testRequest(apiKey, 'X-API-Key');
  
  // Method 4: Query parameter
  try {
    console.log('\nTesting with query parameter');
    const response = await fetch(`${KIE_API_URL}?api_key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-6-astra',
        input: [{ role: 'user', content: [{ type: 'input_text', text: 'Hello' }] }],
        stream: false
      })
    });
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('Error:', error.message);
  }
})();
