const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Use your OpenAI API key
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'; // OpenAI Chat Completion endpoint

router.post('/', async (req, res) => {
  const { voiceText } = req.body;

  if (!voiceText || voiceText.trim() === '') {
    return res.status(400).json({ error: "🚫 No input provided" });
  }

  try {
    const response = await axios.post(
      OPENAI_URL,
      {
        model: "gpt-3.5-turbo", // Cheapest model for code generation
        messages: [{ role: "user", content: voiceText }],
        max_tokens: 150, // You can adjust this based on your needs
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30s timeout to avoid hanging
      }
    );

    const generatedText = response.data.choices[0]?.message?.content;

    if (!generatedText) {
      return res.status(502).json({ error: "❌ No code generated." });
    }

    res.json({
      language: "auto",
      code: generatedText.trim() || '⚠️ No useful code generated.',
    });
  } catch (error) {
    const statusCode = error?.response?.status || 500;
    const message = error?.response?.data?.error || error.message;

    console.error("❌ OpenAI API Error:", message);

    if (statusCode === 503) {
      return res.status(503).json({ error: "🚧 OpenAI model is unavailable. Please try again later." });
    }

    res.status(500).json({ error: "🔥 Failed to generate code. Check backend logs for more info." });
  }
});

module.exports = router;
