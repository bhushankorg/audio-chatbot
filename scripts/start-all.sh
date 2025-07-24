#!/bin/bash

# Audio Chatbot - Start Both Frontend and Backend
echo "🚀 Starting Audio Chatbot - Full Stack Application"

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
    read -p "   Continue anyway? (y/N): " continue_choice
    if [[ ! "$continue_choice" =~ ^[Yy]$ ]]; then
        echo "   Exiting. Please create the .env file and try again."
        exit 1
    fi
fi

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "🛑 Shutting down services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "   ✅ Backend stopped"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "   ✅ Frontend stopped"
    fi
    echo "👋 Goodbye!"
    exit 0
}

# Set up signal handling
trap cleanup SIGINT SIGTERM

echo "📋 Starting services in the following order:"
echo "   1. Backend (FastAPI) on http://localhost:8000"
echo "   2. Frontend (React) on http://localhost:5173"
echo ""

# Start backend in background
echo "🔧 Starting backend..."
cd "$PROJECT_ROOT/backend"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python -m venv venv
fi

# Activate virtual environment and install dependencies
source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1

# Start backend
export PYTHONPATH="$PROJECT_ROOT/backend"
uvicorn main:app --reload --host 0.0.0.0 --port 8000 > /dev/null 2>&1 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Check if backend is running
if ! curl -s http://localhost:8000/docs > /dev/null 2>&1; then
    echo "❌ Backend failed to start. Check your configuration."
    cleanup
fi

echo "✅ Backend started successfully on http://localhost:8000"

# Start frontend
echo "🎨 Starting frontend..."
cd "$PROJECT_ROOT/frontend"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install > /dev/null 2>&1
fi

# Start frontend
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 5

echo "✅ Frontend started successfully on http://localhost:5173"
echo ""
echo "🎉 Audio Chatbot is now running!"
echo "   🌐 Frontend: http://localhost:5173"
echo "   🔧 Backend API: http://localhost:8000"
echo "   📚 API Documentation: http://localhost:8000/docs"
echo ""
echo "🎤 Instructions:"
echo "   1. Open http://localhost:5173 in your browser"
echo "   2. Allow microphone permissions when prompted"
echo "   3. Use push-to-talk or continuous mode for voice input"
echo "   4. Enjoy chatting with your AI assistant!"
echo ""
echo "🛑 Press Ctrl+C to stop both services"

# Keep script running and wait for user interrupt
while true; do
    sleep 1
    # Check if processes are still running
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo "❌ Backend process died unexpectedly"
        cleanup
    fi
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "❌ Frontend process died unexpectedly"
        cleanup
    fi
done
