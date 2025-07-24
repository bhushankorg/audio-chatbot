#!/bin/bash

# Audio Chatbot - Frontend Startup Script
echo "🎨 Starting Audio Chatbot Frontend..."

# Navigate to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Navigate to frontend directory
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
else
    echo "✅ Node.js dependencies already installed"
fi

# Check if .env file exists in frontend directory
if [ ! -f ".env" ]; then
    echo "⚠️  Info: No .env file found in frontend directory"
    echo "   The frontend currently uses the backend for AI processing,"
    echo "   so no frontend API key is required."
    echo ""
fi

# Start the development server
echo "🎯 Starting Vite development server on http://localhost:5173"
echo "🌐 The app will automatically open in your browser"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

npm run dev
