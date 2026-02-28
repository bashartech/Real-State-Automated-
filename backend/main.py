import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from agents import Runner
from agent import real_estate_agent

load_dotenv()

app = FastAPI(title="Real Estate Chatbot API")

# Configure CORS
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3001")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url, "http://localhost:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class ChatRequest(BaseModel):
    message: str
    conversation_id: str = None

class ChatResponse(BaseModel):
    response: str
    conversation_id: str

# Store conversation history (in production, use Redis or database)
conversations = {}

def get_conversation_history(conversation_id: str):
    """Get or create conversation history"""
    if conversation_id not in conversations:
        conversations[conversation_id] = []
    return conversations[conversation_id]

def add_to_conversation(conversation_id: str, role: str, content: str):
    """Add a message to conversation history"""
    history = get_conversation_history(conversation_id)
    history.append({"role": role, "content": content})
    # Keep only last 20 messages to avoid token limits
    if len(history) > 20:
        conversations[conversation_id] = history[-20:]

@app.get("/")
async def root():
    return {
        "message": "Real Estate Chatbot API",
        "status": "running",
        "endpoints": {
            "chat": "/chat",
            "health": "/health"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main chat endpoint - processes user messages and returns AI responses
    """
    try:
        user_message = request.message
        conversation_id = request.conversation_id or "default"

        print(f"Received message: {user_message} (conversation: {conversation_id})")

        # Get conversation history
        history = get_conversation_history(conversation_id)

        # Build conversation context (simpler approach)
        if history:
            # Include recent context in a natural way
            recent_messages = history[-6:]  # Last 3 exchanges (6 messages)
            context_summary = "Context from previous messages: "
            for msg in recent_messages:
                if msg['role'] == 'user':
                    context_summary += f"User said: {msg['content']}. "
                else:
                    context_summary += f"You replied: {msg['content'][:100]}... "

            full_input = f"{context_summary}\n\nCurrent user message: {user_message}"
        else:
            full_input = user_message

        # Run the agent with conversation context
        result = await Runner.run(
            starting_agent=real_estate_agent,
            input=full_input
        )

        # Extract the response
        response_text = str(result.final_output)

        print(f"Agent response: {response_text[:100]}...")

        # Save to conversation history
        add_to_conversation(conversation_id, "user", user_message)
        add_to_conversation(conversation_id, "assistant", response_text)

        return ChatResponse(
            response=response_text,
            conversation_id=conversation_id
        )

    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in chat endpoint: {e}")
        print(f"Full traceback: {error_details}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/reset")
async def reset_conversation(conversation_id: str = "default"):
    """
    Reset a conversation history
    """
    if conversation_id in conversations:
        del conversations[conversation_id]

    return {"message": "Conversation reset successfully"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)
