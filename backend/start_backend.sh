#!/bin/bash

# Audio Chatbot - Backend Startup Script (Individual)
echo "🚀 Starting Audio Chatbot Backend..."

# Get the current directory (should be backend/)
BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Set Python path to backend directory
export PYTHONPATH="$BACKEND_DIR"

echo "🎯 Starting FastAPI backend on http://localhost:8000"
echo "📚 API docs will be available at http://localhost:8000/docs"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

uvicorn main:app --reload --host 0.0.0.0 --port 8000
