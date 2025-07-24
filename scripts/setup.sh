#!/bin/bash

# Audio Chatbot - Initial Setup Script
echo "🎙️  Audio Chatbot - Initial Setup"
echo "=================================="

# Navigate to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo "📁 Project directory: $PROJECT_ROOT"
echo ""

# Check for required tools
echo "🔍 Checking system requirements..."

# Check Node.js
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js found: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install Node.js v18 or higher."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Python
if command -v python >/dev/null 2>&1; then
    PYTHON_VERSION=$(python --version)
    echo "✅ Python found: $PYTHON_VERSION"
elif command -v python3 >/dev/null 2>&1; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ Python found: $PYTHON_VERSION"
    alias python=python3
else
    echo "❌ Python not found. Please install Python 3.8 or higher."
    echo "   Download from: https://python.org/"
    exit 1
fi

echo ""

# Setup environment file
echo "🔐 Setting up environment variables..."
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created .env file from template"
        echo "⚠️  Please edit .env and add your API keys:"
        echo "   - API_KEY: Get from https://openrouter.ai/"
        echo ""
    else
        cat > .env << EOF
# Audio Chatbot Environment Variables
API_KEY=your_openrouter_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
EOF
        echo "✅ Created .env file"
        echo "⚠️  Please edit .env and add your API keys"
        echo ""
    fi
else
    echo "✅ .env file already exists"
fi

# Setup backend
echo "🔧 Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python -m venv venv
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi

echo "🔄 Activating virtual environment and installing dependencies..."
source venv/bin/activate
pip install -r requirements.txt

echo "✅ Backend dependencies installed"

# Setup frontend
echo "🎨 Setting up frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
    echo "✅ Frontend dependencies installed"
else
    echo "✅ Frontend dependencies already installed"
fi

# Make scripts executable
echo "🔧 Making startup scripts executable..."
cd ../scripts
chmod +x *.sh
echo "✅ Startup scripts are now executable"

cd "$PROJECT_ROOT"

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. 📝 Edit .env file and add your API keys:"
echo "   nano .env"
echo ""
echo "2. 🚀 Start the application:"
echo "   ./scripts/start-all.sh"
echo ""
echo "   Or start services individually:"
echo "   ./scripts/start-backend.sh"
echo "   ./scripts/start-frontend.sh"
echo ""
echo "3. 🌐 Open http://localhost:5173 in your browser"
echo ""
echo "📚 For more information, see README_updated.md"
