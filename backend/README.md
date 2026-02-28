# Real Estate AI Chatbot Backend

AI-powered chatbot backend using Gemini API with OpenAI Agent SDK and FastAPI.

## Setup

1. **Install dependencies:**
```bash
uv sync
```

2. **Configure environment variables:**
Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```

Required variables:
- `GEMINI_API_KEY` - Your Gemini API key from Google AI Studio
- `SANITY_PROJECT_ID` - Your Sanity project ID (already set: sq2wmzn5)
- `SANITY_DATASET` - Your Sanity dataset (production)
- `SANITY_TOKEN` - Your Sanity API token with write permissions

3. **Run the server:**
```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --port 8000
```

## API Endpoints

### POST /chat
Send a message to the chatbot.

**Request:**
```json
{
  "message": "I'm looking for a 3 bedroom house under $500k",
  "conversation_id": "user123"
}
```

**Response:**
```json
{
  "response": "I'd be happy to help you find a 3 bedroom house...",
  "conversation_id": "user123"
}
```

### GET /health
Check if the server is running.

### POST /reset
Reset conversation history for a specific conversation ID.

## Features

- Property search with filters (type, price range)
- Property details retrieval
- Lead capture and saving to Sanity
- Property inquiry submission
- Natural language understanding
- Function calling for database operations

## Agent Capabilities

The chatbot can:
1. Search properties by type, price, location
2. Provide detailed property information
3. Answer real estate questions
4. Collect user contact information
5. Save leads to Sanity database
6. Submit property inquiries
7. Schedule consultations

## Testing

Test the API with curl:
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Show me available properties"}'
```

## Next Steps

After backend is running:
1. Create React Chatbot component
2. Integrate chatbot widget into frontend
3. Test end-to-end functionality
4. Add conversation history persistence
