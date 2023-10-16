// In this script, we:

// Import the express module.
// Create an Express application.
// Tell Express to serve static files (your game files) from the 'public' directory.
// Define a route that sends the index.html file in response to HTTP GET requests.
// Tell the server to listen for incoming connections on a given port.

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle GET requests to the server root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
