# 🎙️ Speech to Text Transcription

A simple web application that converts spoken audio into text using a user-friendly interface. Built with a React frontend and a Node.js backend, this project demonstrates the fundamentals of speech recognition integration in web applications.

---

## 📁 Project Structure

```
Speech_to_text_transcribtion/
├── speech-to-text-frontend/   # React frontend
├── speech-to-text-backend/    # Node.js backend
├── package.json               # Project metadata
├── .gitignore                 # Git ignore rules
```

---

## 🚀 Features

- 🎧 **Audio Input**: Record audio files directly from the browser.
- 📝 **Real-time Transcription**: Display transcribed text as the audio plays.
- 💾 **Save Transcripts**: Option to download or copy the transcribed text.
- 🌐 **Responsive Design**: Optimized for both desktop and mobile browsers.

---

## 🔧 Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Backend Setup

```bash
cd speech-to-text-backend
npm install
npm start
```

### Frontend Setup

```bash
cd speech-to-text-frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5500`.

---

## 🛠️ Technologies Used

- **Frontend**: React, CSS3
- **Backend**: Node.js, Express
- **Speech Recognition**: Uses OpenAI's GPT-3.5 Turbo model for transcribing speech to text via integrated API.


## 📌 Future Enhancements

- Implement user authentication for saving transcripts.
- Add punctuation and formatting to transcribed text.
---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---
