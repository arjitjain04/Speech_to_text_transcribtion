// src/pages/CodePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../App.css';

function CodePage() {
  const [codeResult, setCodeResult] = useState('');
  const [error, setError] = useState('');
  const [customTranscript, setCustomTranscript] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  // Sync transcript into editable state only while listening
  useEffect(() => {
    if (listening) {
      setCustomTranscript(transcript);
    }
  }, [transcript, listening]);

  const handleGenerateCode = async () => {
    const finalText = customTranscript.trim();
    if (!finalText) return;

    try {
      const res = await axios.post('http://localhost:5500/api/generate-code', {
        voiceText: finalText
      });
      setCodeResult(res.data.code);
      setError('');
    } catch (err) {
      console.error(err);
      setError('❌ Failed to generate code.');
    }
  };

  const handleReset = () => {
    resetTranscript();
    setCustomTranscript('');
    setCodeResult('');
    setError('');
  };

  return (
    <div className="container">
      <h1>💻 Speech to Code</h1>

      <div className="button-group">
        <button className="btn" onClick={() => SpeechRecognition.startListening({ continuous: true, language: 'en-US' })}>
          ▶️ Start Listening
        </button>
        <button className="btn" onClick={SpeechRecognition.stopListening}>⏹️ Stop</button>
        <button className="btn" onClick={handleReset}>🔄 Reset</button>
      </div>

      <p className="status">
        {listening ? '🎧 Listening (English)...' : '🛑 Not Listening'}
      </p>

      <textarea
        value={customTranscript}
        onChange={(e) => setCustomTranscript(e.target.value)}
        rows={4}
        placeholder="Speak or type your command here..."
        className="transcript-input"
      />

      <button className="btn" onClick={handleGenerateCode}>💻 Generate Code</button>

      {error && <p className="error">{error}</p>}

      {codeResult && (
        <div className="output-box">
          <h3>💻 Generated Code:</h3>
          <pre>{codeResult}</pre>
        </div>
      )}
    </div>
  );
}

export default CodePage;
