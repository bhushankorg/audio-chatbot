#!/bin/bash

# Audio Chatbot - Backend Startup Script
echo "🚀 Starting Audio Chatbot Backend..."

# Navigate to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found in project root!"
    echo "   Please create a .env file with your API keys:"
    echo "   API_KEY=your_openrouter_api_key_here"
    echo "   OPENAI_API_KEY=optional_openai_key"
    echo ""
fi

# Navigate to backend directory
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install/update dependencies
echo "📚 Installing/updating dependencies..."
pip install -r requirements.txt

# Set Python path
export PYTHONPATH="$PROJECT_ROOT/backend"

# Start the backend server
echo "🎯 Starting FastAPI backend on http://localhost:8000"
echo "📚 API docs will be available at http://localhost:8000/docs"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

uvicorn main:app --reload --host 0.0.0.0 --port 8000
