from fastapi import APIRouter, Request
from llm_service import ask_gpt

router = APIRouter()

@router.post("/chat")
async def chat(request: Request):
    data = await request.json()
    message = data.get("message", "")
    session_id = data.get("session_id", "")
    reply = ask_gpt(message, session_id)
    return {"reply": reply}
