# Audio Voice Chatbot

## Overview

An AI-powered voice chatbot that enables natural conversation through speech recognition and text-to-speech capabilities. The system features a modern React frontend with voice controls and a FastAPI backend for extensible AI model integration.

---

## Technologies Used

- **Frontend:** React 18 + Vite + Chakra UI
- **Backend:** Python FastAPI with OpenRouter/Llama-3 integration
- **AI Engine:** OpenRouter Llama-3-8b-instruct (backend)
- **Speech:** Web Speech API + react-speech-recognition
- **Styling:** Chakra UI with responsive design
- **Development:** Hot reload, modern ES modules

---

## Key Features

### Voice Interaction
- **Speech Recognition:** Real-time voice input using browser's speech recognition
- **Text-to-Speech:** AI responses spoken aloud with mute/unmute controls
- **Voice Controls:** Start/stop listening, generate responses from speech

### Chat Interface
- **Conversation History:** Persistent chat history with user/bot message distinction
- **Sample Prompts:** Pre-defined questions for quick interaction
- **Responsive Design:** Works seamlessly on desktop and mobile devices
- **Modern UI:** Clean, intuitive interface built with Chakra UI

### AI Integration
  - OpenRouter Llama-3-8b-instruct with session management
- **Conversation Context:** Maintains chat history for contextual responses

---

## Local Testing Guide

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **API Keys:**
  - OpenRouter API key

### Environment Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bhushankorg/audio-chatbot.git
   cd audio-chatbot
   ```

2. **Create environment files:**

   **Frontend (.env in frontend/ directory):**
   ```env
   VITE_API=your_google_gemini_api_key_here
   ```

   **Backend (.env in project root):**
   ```env
   API_KEY=your_openrouter_api_key_here
   OPENAI_API_KEY=optional_openai_key
   ```

### Frontend Setup & Testing

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Open browser to `http://localhost:5173`
   - Allow microphone permissions when prompted
   - Test voice recognition by clicking "Start Listening"

### Backend Setup & Testing

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Update the start script path:**
   Edit `start_backend.sh` and update the PYTHONPATH to your current directory

5. **Start the backend server:**
   ```bash
   # Option 1: Using the shell script
   chmod +x start_backend.sh
   ./start_backend.sh
   
   # Option 2: Direct uvicorn command
   uvicorn main:app --reload
   ```

6. **Test the backend:**
   - Backend runs on `http://localhost:8000`
   - API documentation available at `http://localhost:8000/docs`
   - Test the `/chat` endpoint with a POST request

### Testing the Voice Features

1. **Speech Recognition:**
   - Click "Start Listening" 
   - Speak clearly into your microphone
   - Click "Generate" to stop listening and get AI response

2. **Text-to-Speech:**
   - AI responses are automatically spoken
   - Use the mute/unmute button to control audio output
   - Individual message playback available in chat history

3. **Sample Prompts:**
   - Click any prompt card on the left to quickly test AI responses
   - Prompts cover various topics for comprehensive testing

### Browser Compatibility

- **Recommended:** Chrome, Edge, Safari (latest versions)
- **Speech Recognition:** Requires HTTPS in production (works on localhost for development)
- **Microphone Access:** Browser will request permissions on first use

---

## Troubleshooting

### Common Issues

1. **Microphone not working:**
   - Ensure browser has microphone permissions
   - Check if other applications are using the microphone
   - Try refreshing the page and granting permissions again

2. **Speech recognition not responding:**
   - Speech recognition works best in Chrome/Edge
   - Ensure you're speaking clearly and loudly enough
   - Check browser console for any errors

3. **Backend connection issues:**
   - Verify the backend is running on port 8000
   - Check that CORS is properly configured
   - Ensure API keys are correctly set in environment files

4. **API key errors:**
   - Verify your Gemini API key is valid and has quota
   - Check OpenRouter API key format and permissions
   - Ensure environment files are in the correct locations

### Development Notes

- **Current Architecture:** Frontend uses Gemini AI directly; backend is set up but not integrated
- **Future Integration:** Backend can be connected to frontend for unified AI processing
- **Audio Services:** STT/TTS services are planned but currently handled by frontend
- **Session Management:** Backend includes session management for conversation context

---

## Deployment Overview (AWS EC2)

1. **Launch EC2 instance (Ubuntu).**
2. **Install Python, pip, and dependencies.**
3. **Run chatbot using Gunicorn.**
4. **Set up Nginx as a reverse proxy.**
5. **Add SSL via Certbot (Let's Encrypt).**
6. **Access chatbot via your public domain or EC2 IP.**

---

## Summary

This project combines AI, voice technology, and modern web development to create an accessible, intelligent, and scalable voice chatbot system. The modular architecture allows for easy integration of different AI models and extensible functionality.
