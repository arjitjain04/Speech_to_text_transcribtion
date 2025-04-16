const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');  // Import OpenAI SDK

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: '' // Replace with your actual API key
});

router.post('/', async (req, res) => {
  const { speechText, targetLang } = req.body;

  if (!speechText || !targetLang) {
    return res.status(400).json({ error: 'Both speechText and targetLang are required.' });
  }

  try {
    const prompt = `Translate the following text to ${targetLang}:\n"${speechText}"`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful translator.' },
        { role: 'user', content: prompt }
      ],
    });

    const reply = completion.choices[0].message.content;

    res.json({ translatedText: reply });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Translation failed' });
  }
});

module.exports = router;
