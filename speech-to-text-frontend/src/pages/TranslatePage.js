import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function TranslatePage() {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');
  const [speechLang, setSpeechLang] = useState('en-US');
  const [targetLang, setTargetLang] = useState('hi');
  const [customTranscript, setCustomTranscript] = useState('');

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (listening) {
      setCustomTranscript(transcript);
    }
  }, [transcript, listening]);

  const handleTranslate = async () => {
    const finalText = customTranscript.trim();
    if (!finalText) return;

    setOriginalText(finalText);

    try {
      const res = await axios.post('http://localhost:5500/api/transcribe', {
        speechText: finalText,
        targetLang: targetLang,
      });
      setTranslatedText(res.data.translatedText);
      setError('');
    } catch (err) {
      console.error(err);
      setError('❌ Translation failed. Please try again.');
    }
  };

  const handleReset = () => {
    resetTranscript();
    setCustomTranscript('');
    setOriginalText('');
    setTranslatedText('');
    setError('');
  };

  const handleDownload = (text, filename) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="container">
      <h1>🌐 Speech Translator</h1>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <label>🎙️ Speech Language: </label>
        <select value={speechLang} onChange={(e) => setSpeechLang(e.target.value)}>
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
          <option value="gu-IN">Gujarati</option>
          <option value="bn-IN">Bengali</option>
          <option value="ta-IN">Tamil</option>
          <option value="te-IN">Telugu</option>
        </select>

        <br /><br />

        <label>🌐 Translate To: </label>
        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="gu">Gujarati</option>
          <option value="bn">Bengali</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
        </select>
      </div>

      <div className="button-group">
        <button className="btn" onClick={() => SpeechRecognition.startListening({ continuous: true, language: speechLang })}>
          ▶️ Start Listening
        </button>
        <button className="btn" onClick={SpeechRecognition.stopListening}>
          ⏹️ Stop
        </button>
        <button className="btn" onClick={handleReset}>
          🔄 Reset
        </button>
      </div>

      <p className="status">
        {listening ? `🎧 Listening (${speechLang})...` : '🛑 Not Listening'}
      </p>

      <button className="btn" onClick={handleTranslate}>
        🌐 Translate
      </button>

      {error && <p className="error">{error}</p>}

      <div className="output-box">
        {originalText && (
          <>
            <h3>📝 Original Text:</h3>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              rows={4}
              className="transcript-output"
            />
            <button className="btn" onClick={() => handleDownload(originalText, 'original_text.txt')}>
              ⬇️ Download Original Text
            </button>
          </>
        )}

        {translatedText !== '' ? (
          <>
            <h3>🌐 Translated Text:</h3>
            <textarea
              value={translatedText}
              readOnly
              rows={4}
              className="transcript-output"
            />
            <button className="btn" onClick={() => handleDownload(translatedText, 'translated_text.txt')}>
              ⬇️ Download Translated Text
            </button>
          </>
        ) : (
          !error && (
            <>
              <h3>🌐 Translated Text:</h3>
              <textarea
                value=""
                readOnly
                rows={4}
                className="transcript-output"
              />
            </>
          )
        )}
      </div>
    </div>
  );
}

export default TranslatePage;
