#!/bin/bash

# Audio Chatbot - System Test Script
echo "🧪 Audio Chatbot - System Test"
echo "==============================="

# Navigate to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo "📁 Testing from: $PROJECT_ROOT"
echo ""

# Test 1: Check project structure
echo "📂 Test 1: Project structure"
REQUIRED_DIRS=("frontend" "backend" "scripts")
REQUIRED_FILES=("README.md" "frontend/package.json" "backend/requirements.txt")

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "   ✅ $dir/ directory exists"
    else
        echo "   ❌ $dir/ directory missing"
    fi
done

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file exists"
    else
        echo "   ❌ $file missing"
    fi
done

echo ""

# Test 2: Check environment
echo "🔐 Test 2: Environment configuration"
if [ -f ".env" ]; then
    echo "   ✅ .env file exists"
    if grep -q "API_KEY=" .env; then
        if grep -q "your_openrouter_api_key_here" .env; then
            echo "   ⚠️  API_KEY not configured (still has placeholder)"
        else
            echo "   ✅ API_KEY appears to be configured"
        fi
    else
        echo "   ❌ API_KEY not found in .env"
    fi
else
    echo "   ❌ .env file missing"
fi

echo ""

# Test 3: Check script permissions
echo "🔧 Test 3: Script permissions"
SCRIPTS=("setup.sh" "start-all.sh" "start-backend.sh" "start-frontend.sh")

for script in "${SCRIPTS[@]}"; do
    if [ -f "scripts/$script" ]; then
        if [ -x "scripts/$script" ]; then
            echo "   ✅ scripts/$script is executable"
        else
            echo "   ⚠️  scripts/$script is not executable (run: chmod +x scripts/$script)"
        fi
    else
        echo "   ❌ scripts/$script missing"
    fi
done

if [ -f "backend/start_backend.sh" ]; then
    if [ -x "backend/start_backend.sh" ]; then
        echo "   ✅ backend/start_backend.sh is executable"
    else
        echo "   ⚠️  backend/start_backend.sh is not executable"
    fi
fi

echo ""

# Test 4: Check dependencies
echo "📦 Test 4: Dependencies"

# Check backend dependencies
if [ -d "backend/venv" ]; then
    echo "   ✅ Backend virtual environment exists"
    cd backend
    source venv/bin/activate
    if pip show fastapi > /dev/null 2>&1; then
        echo "   ✅ FastAPI installed"
    else
        echo "   ❌ FastAPI not installed"
    fi
    if pip show uvicorn > /dev/null 2>&1; then
        echo "   ✅ Uvicorn installed"
    else
        echo "   ❌ Uvicorn not installed"
    fi
    deactivate
    cd ..
else
    echo "   ❌ Backend virtual environment not found"
fi

# Check frontend dependencies
if [ -d "frontend/node_modules" ]; then
    echo "   ✅ Frontend node_modules exists"
    cd frontend
    if [ -f "node_modules/react/package.json" ]; then
        echo "   ✅ React installed"
    else
        echo "   ❌ React not found"
    fi
    if [ -f "node_modules/vite/package.json" ]; then
        echo "   ✅ Vite installed"
    else
        echo "   ❌ Vite not found"
    fi
    cd ..
else
    echo "   ❌ Frontend node_modules not found"
fi

echo ""

# Test 5: Port availability
echo "🌐 Test 5: Port availability"
if command -v lsof >/dev/null 2>&1; then
    if lsof -i :8000 > /dev/null 2>&1; then
        echo "   ⚠️  Port 8000 is in use (backend port)"
    else
        echo "   ✅ Port 8000 available (backend)"
    fi
    
    if lsof -i :5173 > /dev/null 2>&1; then
        echo "   ⚠️  Port 5173 is in use (frontend port)"
    else
        echo "   ✅ Port 5173 available (frontend)"
    fi
else
    echo "   ⚠️  Cannot check port availability (lsof not available)"
fi

echo ""
echo "🏁 Test Summary"
echo "==============="
echo ""
echo "If you see any ❌ or ⚠️  above, please address those issues."
echo ""
echo "Quick fixes:"
echo "• Missing dependencies: Run ./scripts/setup.sh"
echo "• API key not configured: Edit .env file"
echo "• Scripts not executable: Run chmod +x scripts/*.sh"
echo "• Ports in use: Stop other services or restart"
echo ""
echo "Ready to start? Run: ./scripts/start-all.sh"
