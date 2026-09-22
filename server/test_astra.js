const { sendMessage } = require('./services/astra');

(async () => {
  try {
    console.log('Testing sendMessage...');
    const reply = await sendMessage('Hello', []);
    console.log('Reply:', reply);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.status) {
      console.error('Status:', error.status);
    }
    if (error.userMessage) {
      console.error('User message:', error.userMessage);
    }
  }
})();
