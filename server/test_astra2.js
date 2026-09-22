require('dotenv').config();
const { sendMessage } = require('./services/astra');

(async () => {
  try {
    console.log('Testing sendMessage...');
    console.log('KIE_API_KEY from process.env:', !!process.env.KIE_API_KEY);
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
