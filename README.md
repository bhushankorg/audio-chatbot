# AI Chatbot Project Overview

## Objective

Build a complete AI-powered chatbot that communicates with users via a simple web interface. The chatbot will be powered by OpenAI’s GPT API and hosted on an AWS EC2 instance. The system will be easy to use, responsive, and capable of storing conversations for later analysis.

---

## Technologies Used

- **Backend:** Python FastAPI
- **Frontend:** HTML/React JS
- **AI Engine:** LLM API (option to switch to LLaMA2)
- **Deployment:** AWS EC2 with Nginx, Docker for containerized deployment
- **Storage:** SQLite (or PostgreSQL for advanced setup)
- **Security:** AWS secrets key management and optional user login
---

## Key Features

### Core
- Users can chat with an AI assistant via a web interface.
- Conversations are processed in real-time using GPT.

### Chat History
- Session-based conversation logging (e.g., each user session is stored).
- Simple database (SQLite) or optional PostgreSQL support.

### Web Interface
- Clean and responsive design.
- Works on mobile and desktop.
- Option to reset conversation.

### Security & Deployment
- Secure API key management (.env file).
- Deployed using Gunicorn and Nginx on Ubuntu EC2.
- SSL enabled using Let's Encrypt.
- Optional Docker support for simplified setup and deployment.

### Optional Enhancements
- User login system (email/password).
- Analytics dashboard for chat insights.
- Replace OpenAI API with local model (e.g., LLaMA2).

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

This project combines AI, cloud, and web technologies to create an accessible, intelligent, and scalable chatbot system that can be adapted for various business needs.