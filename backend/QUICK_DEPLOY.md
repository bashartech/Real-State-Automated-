# 🚀 Quick Deployment Checklist for Hugging Face Spaces

## Files to Upload

Upload these files to your Hugging Face Space:

```
backend/
├── Dockerfile              ✅ Simplified Docker configuration
├── requirements.txt        ✅ Python dependencies
├── agent.py               ✅ AI agent logic
├── main.py                ✅ FastAPI server
├── sanity_client.py       ✅ Sanity CMS client
├── .dockerignore          ✅ Files to exclude from build
└── README.md              ✅ Documentation
```

## Environment Variables (Required)

Set these in Space Settings → Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `SANITY_PROJECT_ID` | Sanity project ID | `sq2wmzn5` |
| `SANITY_DATASET` | Dataset name | `production` |
| `SANITY_TOKEN` | Sanity write token | `sk...` |
| `FRONTEND_URL` | Frontend URL (optional) | `https://yourapp.com` |

## Deployment Steps

### 1. Create Space
- Go to https://huggingface.co/spaces
- Click "Create new Space"
- Choose **Docker** SDK
- Name: `real-estate-chatbot-api`

### 2. Upload Files
```bash
# Option A: Git
git clone https://huggingface.co/spaces/YOUR_USERNAME/real-estate-chatbot-api
cd real-estate-chatbot-api
cp /path/to/backend/* .
git add .
git commit -m "Deploy backend"
git push

# Option B: Web UI
# Upload files via "Files" tab
```

### 3. Set Environment Variables
- Go to Settings → Variables
- Add all required variables as **secrets**

### 4. Wait for Build
- Check "Logs" tab
- Build takes ~2-3 minutes
- Status changes to "Running"

### 5. Test API
```bash
# Health check
curl https://YOUR_USERNAME-real-estate-chatbot-api.hf.space/health

# Chat test
curl -X POST https://YOUR_USERNAME-real-estate-chatbot-api.hf.space/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Show me properties", "conversation_id": "test"}'
```

## Troubleshooting

### Build Fails
- Check "Logs" tab for errors
- Verify all files are uploaded
- Check requirements.txt syntax

### 500 Error
- Verify environment variables are set
- Check API keys are valid
- View runtime logs

### CORS Error
- Add your frontend URL to CORS settings in main.py
- Or use `allow_origins=["*"]` for testing

## Success Indicators

✅ Build completes without errors
✅ Status shows "Running"
✅ `/health` endpoint returns `{"status": "healthy"}`
✅ `/chat` endpoint responds with AI message

## Next Steps

1. Update frontend with Space URL
2. Test end-to-end functionality
3. Monitor logs for issues
4. Consider upgrading hardware for production

---

**Your API URL:** `https://YOUR_USERNAME-real-estate-chatbot-api.hf.space`

Need help? Check DEPLOYMENT_GUIDE.md for detailed instructions.
