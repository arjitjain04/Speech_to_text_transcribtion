// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TranslatePage from './pages/TranslatePage';
import CodePage from './pages/CodePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>🎙️ Speech-to-Code & Translate</h1>
        <p className="subheading">
          Convert your voice into translated text or auto-generated code in seconds.
          Powered by AI, built for developers and multilingual users.
        </p>

        <nav className="nav-buttons">
          <Link to="/translate" className="btn">🌐 Translate</Link>
          <Link to="/code" className="btn">💻 Generate Code</Link>
        </nav>

        <Routes>
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/code" element={<CodePage />} />
        </Routes>

        <footer className="footer">
          <p>🚀 Made with ❤️ by Arjit • College Project 2025</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
