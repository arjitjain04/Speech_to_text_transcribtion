const mongoose = require('mongoose');

const TranscriptionSchema = new mongoose.Schema({
  inputLanguage: String,
  transcript: String,
  codeLanguage: String,
  codeSnippet: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transcription', TranscriptionSchema);
