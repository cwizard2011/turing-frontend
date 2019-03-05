const express = require('express');
const path = require('path');

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use((req, res, next) => {
  if (req.url === '/items') {
    req.url = '/products';
  }
  next();
});

app.use(express.static(path.join(__dirname, '/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port);
