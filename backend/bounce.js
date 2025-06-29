const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const NASA_API_KEY = 'R2nHNOa6vrCbN28f2gTl3KJf4VHCBJdEchc14SYZ'; // Replace with your key

// Example route for APOD
app.get('/api/apod', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Mars Rover route
app.get('/api/mars', async (req, res) => {
  const date = req.query.date || '2020-07-01'; // default date
  const rover = req.query.rover || 'curiosity';

  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${NASA_API_KEY}`
    );
    res.json(response.data.photos);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
  }
});
