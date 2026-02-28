# ✅ Backend Deployment - Ready to Deploy

## What Was Fixed

1. **Simplified Dockerfile** - Removed complex uv installation, using standard pip
2. **Fixed requirements.txt** - Corrected package name from `openai-agents` to `agents`
3. **Removed version pinning** - Using latest compatible versions for easier installation

## 📦 Files Ready for Deployment

```
backend/
├── Dockerfile              ✅ Simple, professional Docker config
├── requirements.txt        ✅ Fixed package names
├── agent.py               ✅ AI agent with Gemini
├── main.py                ✅ FastAPI server
├── sanity_client.py       ✅ Sanity CMS client
├── .dockerignore          ✅ Build optimization
└── README.md              ✅ Documentation
```

## 🚀 Deploy to Hugging Face Spaces

### Step 1: Create Space
1. Go to https://huggingface.co/spaces
2. Click "Create new Space"
3. Settings:
   - Name: `real-estate-chatbot-api`
   - SDK: **Docker**
   - Hardware: CPU basic (free)

### Step 2: Upload Files

**Option A: Git (Recommended)**
```bash
git clone https://huggingface.co/spaces/YOUR_USERNAME/real-estate-chatbot-api
cd real-estate-chatbot-api

# Copy these files from backend folder:
cp /path/to/backend/Dockerfile .
cp /path/to/backend/requirements.txt .
cp /path/to/backend/agent.py .
cp /path/to/backend/main.py .
cp /path/to/backend/sanity_client.py .
cp /path/to/backend/.dockerignore .

git add .
git commit -m "Deploy backend"
git push
```

**Option B: Web Upload**
- Go to your Space → Files tab
- Upload all 6 files listed above

### Step 3: Set Environment Variables

Go to Settings → Variables and add:

| Variable | Value |
|----------|-------|
| `GEMINI_API_KEY` | Your Gemini API key |
| `SANITY_PROJECT_ID` | Your Sanity project ID |
| `SANITY_DATASET` | `production` |
| `SANITY_TOKEN` | Your Sanity write token |
| `FRONTEND_URL` | Your frontend URL (optional) |

**Important:** Mark all as "Secret"

### Step 4: Build & Deploy

- Hugging Face will automatically build
- Check "Logs" tab for progress
- Build takes ~2-3 minutes
- Status will show "Running" when ready

### Step 5: Test Your API

```bash
# Replace YOUR_USERNAME with your HF username
export API_URL="https://YOUR_USERNAME-real-estate-chatbot-api.hf.space"

# Test health endpoint
curl $API_URL/health

# Expected: {"status":"healthy"}

# Test chat endpoint
curl -X POST $API_URL/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Show me luxury properties",
    "conversation_id": "test123"
  }'

# Expected: {"response":"...","conversation_id":"test123"}
```

## 📝 Final Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Expose Hugging Face Spaces default port
EXPOSE 7860

# Set environment variable for port
ENV PORT=7860

# Run the application
CMD ["python", "main.py"]
```

## 📝 Final requirements.txt

```
fastapi
uvicorn[standard]
python-dotenv
pydantic
agents
httpx
```

## 🔧 Update Frontend

Once deployed, update your frontend to use the Space URL:

**File:** `src/components/Chatbot.tsx`

```typescript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ||
  'https://YOUR_USERNAME-real-estate-chatbot-api.hf.space';
```

**File:** `.env.local`

```
VITE_BACKEND_URL=https://YOUR_USERNAME-real-estate-chatbot-api.hf.space
```

## ✅ Success Checklist

- [ ] Space created with Docker SDK
- [ ] All 6 files uploaded
- [ ] Environment variables set as secrets
- [ ] Build completed successfully
- [ ] `/health` returns `{"status":"healthy"}`
- [ ] `/chat` responds with AI message
- [ ] Frontend updated with Space URL
- [ ] End-to-end test successful

## 🐛 If Build Still Fails

1. **Check Logs Tab** - Look for specific error message
2. **Verify Files** - Make sure all 6 files are uploaded
3. **Check requirements.txt** - Should have `agents` not `openai-agents`
4. **Rebuild** - Go to Settings → Factory reboot

## 📊 Expected Build Output

```
[1/5] FROM python:3.11-slim
[2/5] WORKDIR /app
[3/5] COPY requirements.txt .
[4/5] RUN pip install --no-cache-dir -r requirements.txt
[5/5] COPY . .
Successfully built!
```

## 🎉 You're Done!

Your API is now live at:
```
https://YOUR_USERNAME-real-estate-chatbot-api.hf.space
```

Test it, integrate it with your frontend, and you're ready to go!

---

**Need Help?**
- Check DEPLOYMENT_GUIDE.md for detailed troubleshooting
- Review Hugging Face Spaces documentation
- Verify all environment variables are set correctly
