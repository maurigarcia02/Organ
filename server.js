const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors()); // Allow requests from the frontend
app.use(express.json()); // Parse JSON request bodies

const EVENTS_FILE = './events.json';

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



// Endpoint to get events
app.get('/events', (req, res) => {
  fs.readFile(EVENTS_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read events:', err);
      return res.status(500).json({ error: 'Failed to read events' });
    }
    res.json(JSON.parse(data || '[]')); // Return events as JSON
  });
});

// Endpoint to save events
app.post('/events', (req, res) => {
  const events = req.body;
  fs.writeFile(EVENTS_FILE, JSON.stringify(events), (err) => {
    if (err) {
      console.error('Failed to save events:', err);
      return res.status(500).json({ error: 'Failed to save events' });
    }
    res.json({ message: 'Events saved successfully' });
  });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });