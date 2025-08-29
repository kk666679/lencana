const express = require('express');
const app = express();
const PORT = 3001;

// Test basic routes without any middleware
app.get('/', (req, res) => {
  res.json({ message: 'Debug server working!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Debug server running on port ${PORT}`);
});
