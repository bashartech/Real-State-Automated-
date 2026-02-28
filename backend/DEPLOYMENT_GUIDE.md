# 🚀 Hugging Face Spaces Deployment Guide

Complete guide to deploy the Real Estate Chatbot API on Hugging Face Spaces.

## 📋 Prerequisites

Before deploying, make sure you have:

1. **Hugging Face Account** - Sign up at https://huggingface.co
2. **Google Gemini API Key** - Get from https://makersuite.google.com/app/apikey
3. **Sanity CMS Credentials:**
   - Project ID
   - Dataset name (usually "production")
   - Write token (create in Sanity dashboard)

## 🎯 Step-by-Step Deployment

### Step 1: Create a New Space

1. Go to https://huggingface.co/spaces
2. Click **"Create new Space"**
3. Fill in the details:
   - **Owner:** Your username or organization
   - **Space name:** `real-estate-chatbot-api` (or your preferred name)
   - **License:** MIT
   - **Select SDK:** Choose **Docker**
   - **Space hardware:** CPU basic (free tier) or upgrade if needed
   - **Visibility:** Public or Private

4. Click **"Create Space"**

### Step 2: Upload Backend Files

You have two options:

#### Option A: Git Clone (Recommended)

```bash
# Clone your Space repository
git clone https://huggingface.co/spaces/YOUR_USERNAME/real-estate-chatbot-api
cd real-estate-chatbot-api

# Copy backend files
cp -r /path/to/Real_State_App/backend/* .

# Commit and push
git add .
git commit -m "Initial deployment"
git push
```

#### Option B: Web Upload

1. In your Space, click **"Files"** tab
2. Click **"Add file"** → **"Upload files"**
3. Upload these files from the `backend/` folder:
   - `Dockerfile`
   - `pyproject.toml`
   - `uv.lock`
   - `agent.py`
   - `main.py`
   - `sanity_client.py`
   - `.dockerignore`
   - `HF_SPACES_README.md` (rename to `README.md`)

### Step 3: Configure Environment Variables

1. Go to your Space's **Settings** tab
2. Scroll to **"Variables and secrets"**
3. Click **"New secret"** for each variable:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `GEMINI_API_KEY` | Your Gemini API key | `AIzaSy...` |
| `SANITY_PROJECT_ID` | Your Sanity project ID | `sq2wmzn5` |
| `SANITY_DATASET` | Dataset name | `production` |
| `SANITY_TOKEN` | Sanity write token | `sk...` |
| `FRONTEND_URL` | Your frontend URL | `https://yourapp.com` |

**Important:** Mark all as **"Secret"** to keep them private.

### Step 4: Wait for Build

1. Hugging Face will automatically build your Docker image
2. Check the **"Logs"** tab to monitor progress
3. Build typically takes 3-5 minutes
4. Once complete, you'll see "Running" status

### Step 5: Test Your API

Your API will be available at:
```
https://YOUR_USERNAME-real-estate-chatbot-api.hf.space
```

Test the health endpoint:
```bash
curl https://YOUR_USERNAME-real-estate-chatbot-api.hf.space/health
```

Expected response:
```json
{
  "status": "healthy"
}
```

Test the chat endpoint:
```bash
curl -X POST https://YOUR_USERNAME-real-estate-chatbot-api.hf.space/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Show me luxury properties",
    "conversation_id": "test123"
  }'
```

### Step 6: Update Frontend

Update your frontend to use the deployed API:

**File:** `src/components/Chatbot.tsx`

```typescript
// Change this line:
const BACKEND_URL = 'http://localhost:8001';

// To:
const BACKEND_URL = 'https://YOUR_USERNAME-real-estate-chatbot-api.hf.space';
```

Or use environment variable:
```typescript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8001';
```

Then add to `.env.local`:
```
VITE_BACKEND_URL=https://YOUR_USERNAME-real-estate-chatbot-api.hf.space
```

## 🔧 Troubleshooting

### Build Fails

**Check Logs:**
- Go to "Logs" tab in your Space
- Look for error messages during build

**Common Issues:**
1. **Missing files:** Make sure all required files are uploaded
2. **Syntax errors:** Check Python files for errors
3. **Dependency issues:** Verify `pyproject.toml` and `uv.lock` are correct

### API Returns 500 Error

**Check Environment Variables:**
- Verify all secrets are set correctly
- Make sure API keys are valid
- Test Sanity credentials separately

**Check Logs:**
- View runtime logs in the "Logs" tab
- Look for error messages

### CORS Errors

**Update CORS settings in `main.py`:**
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For testing only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**For production, specify your frontend URL:**
```python
allow_origins=[
    "https://yourfrontend.com",
    "https://www.yourfrontend.com"
]
```

### Space Goes to Sleep

**Free tier Spaces sleep after inactivity:**
- First request after sleep takes longer (cold start)
- Consider upgrading to persistent hardware
- Or implement a keep-alive ping from frontend

## 🎨 Customization

### Update Space Appearance

Edit the README.md header (YAML front matter):

```yaml
---
title: Your Custom Title
emoji: 🏠
colorFrom: blue
colorTo: purple
sdk: docker
pinned: true
---
```

### Add Custom Domain

1. Go to Space Settings
2. Scroll to "Custom domain"
3. Follow instructions to add your domain

## 📊 Monitoring

### View Logs

- Go to "Logs" tab in your Space
- See real-time API requests and responses
- Monitor errors and performance

### Usage Statistics

- Check "Analytics" tab (if available)
- Monitor API calls and response times

## 🔄 Updates and Redeployment

### Update Code

```bash
# Make changes to your code
git add .
git commit -m "Update: description of changes"
git push
```

Space will automatically rebuild and redeploy.

### Rollback

```bash
# View commit history
git log

# Rollback to previous commit
git reset --hard COMMIT_HASH
git push --force
```

## 💰 Pricing

**Free Tier:**
- CPU basic (2 vCPU, 16GB RAM)
- Space sleeps after inactivity
- Suitable for testing and low traffic

**Paid Tiers:**
- Persistent hardware (no sleep)
- More CPU/RAM
- GPU options available
- See https://huggingface.co/pricing

## 🔐 Security Best Practices

1. **Never commit secrets** - Use HF Spaces secrets
2. **Use HTTPS only** - Enabled by default
3. **Validate input** - Already implemented in FastAPI
4. **Rate limiting** - Consider adding for production
5. **Monitor logs** - Check for suspicious activity

## 📚 Additional Resources

- [Hugging Face Spaces Documentation](https://huggingface.co/docs/hub/spaces)
- [Docker SDK Guide](https://huggingface.co/docs/hub/spaces-sdks-docker)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## ✅ Deployment Checklist

- [ ] Hugging Face account created
- [ ] Space created with Docker SDK
- [ ] All backend files uploaded
- [ ] Environment variables configured
- [ ] Build completed successfully
- [ ] Health endpoint tested
- [ ] Chat endpoint tested
- [ ] Frontend updated with new API URL
- [ ] CORS configured correctly
- [ ] End-to-end testing completed

## 🎉 Success!

Your Real Estate Chatbot API is now live on Hugging Face Spaces!

**Next Steps:**
1. Share your Space URL with your team
2. Integrate with your frontend
3. Monitor usage and performance
4. Consider upgrading hardware for production

## 💬 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Hugging Face Spaces documentation
3. Contact the development team

---

**Deployed API URL:** `https://YOUR_USERNAME-real-estate-chatbot-api.hf.space`

Happy deploying! 🚀
