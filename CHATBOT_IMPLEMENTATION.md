# AI Chatbot Implementation - Complete

## ✅ Implementation Complete

### Backend (Python FastAPI + Gemini API)

**Location:** `backend/`

**Files Created:**
- `agent.py` - AI agent with Gemini API and function tools
- `sanity_client.py` - Sanity database integration
- `main.py` - FastAPI server with chat endpoint
- `.env` - Environment variables (needs GEMINI_API_KEY)
- `.env.example` - Template for environment variables
- `README.md` - Backend documentation

**Features:**
- Gemini API integration via OpenAI Agent SDK
- Function calling for property search, lead capture, inquiries
- CORS enabled for frontend communication
- Sanity database integration for real-time data

**Dependencies (already in pyproject.toml):**
- fastapi>=0.134.0
- openai>=2.24.0
- openai-agents>=0.10.2
- pydantic>=2.12.5
- python-dotenv>=1.2.1
- sanity>=0.2.5
- uvicorn>=0.41.0

### Frontend (React + TypeScript)

**Location:** `src/components/`

**Files Created:**
- `Chatbot.tsx` - Floating chatbot widget component

**Features:**
- Floating chat button (bottom-right corner)
- Animated chat window with smooth transitions
- Real-time messaging with backend
- Message history display
- Loading states and error handling
- Responsive design matching site theme

**Integration:**
- Added to `App.tsx` - shows on all pages
- Environment variable `VITE_BACKEND_URL` configured

---

## 🚀 How to Run

### 1. Start Backend Server

```bash
cd backend

# Activate virtual environment (if not already active)
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies (if needed)
uv sync

# Add your Gemini API key to .env
# Edit backend/.env and add: GEMINI_API_KEY=your_key_here

# Run the server
python main.py
```

Backend will run on: http://localhost:8000

### 2. Start Frontend (in separate terminal)

```bash
# From project root
npm run dev
```

Frontend will run on: http://localhost:3001

---

## 🔑 Get Gemini API Key

1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Add to `backend/.env`:
   ```
   GEMINI_API_KEY=your_actual_key_here
   ```

---

## 🧪 Testing the Chatbot

### Test Backend API (Optional)

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Show me available properties"}'
```

### Test Frontend

1. Open http://localhost:3001
2. Look for red chat button in bottom-right corner
3. Click to open chat window
4. Try these messages:
   - "Show me available properties"
   - "I'm looking for a 3 bedroom house"
   - "What properties do you have under $500k?"
   - "Tell me about your services"

---

## 🤖 Chatbot Capabilities

The AI assistant can:

1. **Search Properties**
   - Filter by type (House, Apartment, Condo, Land)
   - Filter by price range
   - Show property details

2. **Capture Leads**
   - Collect user contact information
   - Save to Sanity database
   - Track inquiry source

3. **Property Inquiries**
   - Submit inquiries about specific properties
   - Save to Sanity with property reference

4. **Answer Questions**
   - Real estate information
   - Buying/selling process
   - Scott J. Realtor Group services

5. **Schedule Consultations**
   - Collect contact info for follow-up
   - Connect users with agents

---

## 📊 Database Integration

All chatbot interactions save to Sanity:

- **Leads** → `lead` content type (source: "AI Chatbot")
- **Property Inquiries** → `propertyInquiry` content type
- **Property Search** → Queries `property` content type

View in Sanity Studio: http://localhost:3333

---

## 🎨 UI Features

- Floating button with hover animation
- Smooth slide-up chat window
- Message bubbles (user: red, bot: white)
- Typing indicator while bot responds
- Timestamps on messages
- Auto-scroll to latest message
- Keyboard support (Enter to send)
- Error handling with fallback messages

---

## 🔧 Configuration

### Backend Environment Variables

```env
GEMINI_API_KEY=your_key          # Required - Get from Google AI Studio
GEMINI_MODEL=gemini-1.5-pro      # Model to use
GEMINI_BASE_URL=...              # OpenAI-compatible endpoint
SANITY_PROJECT_ID=sq2wmzn5       # Already configured
SANITY_DATASET=production        # Already configured
SANITY_TOKEN=...                 # Already configured
PORT=8000                        # Backend port
FRONTEND_URL=http://localhost:3001
```

### Frontend Environment Variables

```env
VITE_BACKEND_URL=http://localhost:8000  # Backend API URL
```

---

## 📝 Next Steps

1. **Get Gemini API Key** (required to run chatbot)
2. **Start both servers** (backend + frontend)
3. **Test chatbot functionality**
4. **Add properties to Sanity** (for chatbot to search)
5. **Customize agent instructions** (optional - in `agent.py`)

---

## 🐛 Troubleshooting

### Chatbot button not showing
- Check browser console for errors
- Verify frontend is running on port 3001
- Check `VITE_BACKEND_URL` in `.env`

### Backend errors
- Verify Gemini API key is set in `backend/.env`
- Check all dependencies installed: `uv sync`
- Verify Sanity credentials are correct

### Connection errors
- Ensure backend is running on port 8000
- Check CORS settings in `main.py`
- Verify firewall allows localhost connections

### No properties returned
- Add properties in Sanity Studio
- Check property schema has required fields
- Verify Sanity token has read permissions

---

## ✨ Summary

**Chatbot is fully implemented and ready to use!**

Just add your Gemini API key to `backend/.env` and start both servers.

The chatbot will appear on all pages as a floating button in the bottom-right corner.
