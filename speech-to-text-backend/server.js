const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Allow CORS for all origins (React app + Postman testing)
app.use(cors({
  origin: '*',              // Allow all origins (you can later restrict to 'http://localhost:3000')
  methods: ['GET', 'POST'], // Only allow GET and POST requests
}));

// ✅ Parse incoming JSON data
app.use(express.json());

// ✅ Basic health check route
app.get('/', (req, res) => {
  res.send('✅ Backend is up and running!');
});

// ✅ Import and use routes
const transcribeRoute = require('./routes/transcribe');
const codegenRoute = require('./routes/codegen');

app.use('/api/transcribe', transcribeRoute);
app.use('/api/generate-code', codegenRoute);

// ✅ Start server
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
