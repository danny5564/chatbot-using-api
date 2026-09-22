export async function sendMessage(message, history = []) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }

  return data.reply;
}
