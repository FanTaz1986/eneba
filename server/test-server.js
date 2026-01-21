const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simple test
app.get('/test', (req, res) => {
  console.log('📨 GET /test received');
  res.json({ status: 'OK', message: 'Server is working!' });
});

const PORT = 3001;
console.log('Starting server...');

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Server listening on port', PORT);
  console.log('Try: curl http://localhost:5000/test');
});
