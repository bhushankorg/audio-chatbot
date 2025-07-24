import os
import requests
from dotenv import load_dotenv
from typing import Dict, List

load_dotenv()

# Load API key and endpoint
API_KEY = os.getenv('API_KEY')
MODEL = "meta-llama/llama-3-8b-instruct"
API_URL = "https://openrouter.ai/api/v1/chat/completions"

# In-memory session store: session_id -> list of messages
chat_sessions: Dict[str, List[Dict[str, str]]] = {}

def ask_gpt(prompt: str, session_id: str) -> str:
    # return "test signal to avoid the token limits"
    return ask_openrouter(prompt, session_id)

def ask_openrouter(prompt: str, session_id: str) -> str:
    # Initialize session if not already present
    if session_id not in chat_sessions:
        chat_sessions[session_id] = []

    # Add user prompt to the session
    chat_sessions[session_id].append({
        "role": "user",
        "content": prompt
    })

    # Prepare payload
    payload = {
        "model": MODEL,
        "messages": chat_sessions[session_id],
        "temperature": 0.7
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "X-Title": "MyChatBot"
    }
    print(payload)

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        reply = response.json()["choices"][0]["message"]["content"]

        # Add assistant's reply to the session context
        chat_sessions[session_id].append({
            "role": "assistant",
            "content": reply
        })

        return reply
    else:
        error_msg = f"Error: {response.status_code}, {response.text}"
        print(error_msg)
        return error_msg
