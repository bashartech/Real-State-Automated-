---
title: Real Estate Chatbot API
emoji: 🏡
colorFrom: red
colorTo: black
sdk: docker
pinned: false
license: mit
---

# Real Estate Chatbot API

AI-powered real estate chatbot backend using FastAPI and Google Gemini API.

## Features

- 🤖 Intelligent property search using Gemini AI
- 💬 Multi-turn conversation with context memory
- 🏠 Property search by type, price, and location
- 📝 Lead capture and inquiry management
- 🔄 Integration with Sanity CMS

## API Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /chat` - Chat with the AI agent
- `POST /reset` - Reset conversation history

## Environment Variables

Set these in your Hugging Face Space settings (Settings → Variables):

- `GEMINI_API_KEY` - Your Google Gemini API key
- `SANITY_PROJECT_ID` - Sanity project ID
- `SANITY_DATASET` - Sanity dataset name
- `SANITY_TOKEN` - Sanity write token
- `FRONTEND_URL` - Your frontend URL (for CORS)

## Usage

### Chat Endpoint

```bash
curl -X POST https://your-space.hf.space/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Show me luxury homes under $1M",
    "conversation_id": "user123"
  }'
```

### Response

```json
{
  "response": "I found 3 luxury properties...",
  "conversation_id": "user123"
}
```

## Tech Stack

- FastAPI
- Google Gemini API (via OpenAI Agent SDK)
- Sanity CMS
- Python 3.11

## Support

For issues or questions, please contact the development team.
