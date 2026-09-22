const express = require('express');
const router = express.Router();
const { sendMessage } = require('../services/astra');

router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const reply = await sendMessage(message.trim(), history || []);
    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err.message || err);
    const status = err.status || 500;
    const message = err.userMessage || 'Something went wrong. Please try again.';
    res.status(status).json({ error: message });
  }
});

module.exports = router;
