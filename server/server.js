require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;
console.log(`PORT from env: ${process.env.PORT}`);
console.log(`Using PORT: ${PORT}`);
console.log(`EXPERIENTIAL_API_KEY is set: ${!!process.env.EXPERIENTIAL_API_KEY}`);

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`ChatFlow server running on port ${PORT}`);
});
