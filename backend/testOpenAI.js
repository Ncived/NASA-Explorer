// testOpenAI.js
import 'dotenv/config';
import OpenAI from 'openai'; // for ES module (if using CommonJS, use require)

async function testOpenAI() {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Make sure you set this in your .env
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello! Can you help me test this API?' },
      ],
    });

    console.log('Response from OpenAI:', completion.choices[0].message.content);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
}

testOpenAI();
