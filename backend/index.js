const express = require('express');
const axios = require('axios');
const cors = require('cors');
const OpenAI = require('openai'); // updated import

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const NASA_API_KEY = process.env.NASA_API_KEY || 'R2nHNOa6vrCbN28f2gTl3KJf4VHCBJdEchc14SYZ';

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI client setup (new SDK v4+)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// NASA APOD endpoint
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

// Mars Rover photos endpoint
app.get('/api/mars', async (req, res) => {
  const date = req.query.date || '2020-07-01';
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

// AI Insight endpoint (mock)
app.post('/api/ai-insight', async (req, res) => {
  const { context } = req.body;

  if (!context) {
    return res.status(400).json({ error: 'Missing context in request body' });
  }

  try {
    const summary = `Summary: ${context.substring(0, 150)}...`;
    res.json({ summary });
  } catch (error) {
    console.error('AI Insight error:', error.message);
    res.status(500).json({ error: 'Failed to generate AI insight' });
  }
});

// Chatbot endpoint using OpenAI (new syntax)
app.post('/api/chatbot', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message in request body' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant knowledgeable about NASA and space.',
        },
        { role: 'user', content: message },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Chatbot error:', error.message);
    res.status(500).json({ error: 'Failed to get chatbot response' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
