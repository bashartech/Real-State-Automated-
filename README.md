# 🏡 Scott J. Realtor Group - Luxury Real Estate Platform

A modern, full-stack luxury real estate platform built with React, TypeScript, and AI-powered features. This application showcases premium properties in San Antonio with advanced search, filtering, multi-language support, and an intelligent AI chatbot assistant.

![Real Estate Platform](https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&w=1200&q=80)

## ✨ Features

### Frontend
- 🏠 **Property Listings** - Browse luxury homes with detailed information
- 🔍 **Advanced Search & Filters** - Filter by price, size, type, neighborhood, and status
- 🌍 **Multi-Language Support** - Available in 11 languages (English, Spanish, French, German, Chinese, Japanese, Portuguese, Russian, Arabic, Italian, Hindi)
- 📱 **Responsive Design** - Optimized for all devices
- 🎨 **Modern UI/UX** - Built with Tailwind CSS and Framer Motion animations
- 🤖 **AI Chatbot** - Intelligent property search assistant powered by Gemini AI
- 📝 **Contact Forms** - Lead capture and property inquiries
- 🏘️ **Neighborhood Guides** - Explore San Antonio neighborhoods
- 💼 **Property Valuation** - Get instant home value estimates

### Backend
- 🤖 **AI Agent** - Gemini-powered chatbot with function calling
- 💾 **Sanity CMS Integration** - Content management and data storage
- 🔄 **Conversation Memory** - Multi-turn chat with context retention
- 📊 **Property Search** - Advanced filtering and search capabilities
- 📧 **Lead Management** - Capture and store user inquiries

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **Icons:** Lucide React
- **CMS:** Sanity.io Client

### Backend
- **Framework:** FastAPI (Python)
- **AI:** Google Gemini API via OpenAI Agent SDK
- **Database:** Sanity CMS
- **HTTP Client:** httpx
- **Package Manager:** uv

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Sanity Account** (for CMS)
- **Google Gemini API Key** (for AI chatbot)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Real_State_App
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your environment variables to .env.local
# VITE_SANITY_PROJECT_ID=your_project_id
# VITE_SANITY_DATASET=production
# VITE_SANITY_API_VERSION=2024-01-01
# VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id (optional)
# VITE_GITHUB_CLIENT_ID=your_github_oauth_client_id (optional)

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3001`

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install uv (if not already installed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install dependencies
uv sync

# Create environment file
cp .env.example .env

# Add your environment variables to .env
# GEMINI_API_KEY=your_gemini_api_key
# SANITY_PROJECT_ID=your_project_id
# SANITY_DATASET=production
# SANITY_TOKEN=your_sanity_write_token
# PORT=8001

# Start backend server
uv run python main.py
```

The backend will run on `http://localhost:8001`

## 🔑 Environment Variables

### Frontend (.env.local)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SANITY_PROJECT_ID` | Sanity project ID | Yes |
| `VITE_SANITY_DATASET` | Sanity dataset name | Yes |
| `VITE_SANITY_API_VERSION` | Sanity API version | Yes |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `VITE_GITHUB_CLIENT_ID` | GitHub OAuth client ID | No |

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `SANITY_PROJECT_ID` | Sanity project ID | Yes |
| `SANITY_DATASET` | Sanity dataset name | Yes |
| `SANITY_TOKEN` | Sanity write token | Yes |
| `PORT` | Backend server port | No (default: 8001) |

## 📁 Project Structure

```
Real_State_App/
├── backend/                 # Python FastAPI backend
│   ├── agent.py            # AI agent with Gemini
│   ├── main.py             # FastAPI server
│   ├── sanity_client.py    # Sanity CMS client
│   └── .env                # Backend environment variables
├── src/
│   ├── components/         # React components
│   ├── context/            # React context (Language)
│   ├── lib/                # Utilities and API clients
│   ├── pages/              # Page components
│   ├── constants.ts        # Static data
│   ├── translations.ts     # Multi-language translations
│   └── types.ts            # TypeScript types
├── public/                 # Static assets
└── package.json            # Frontend dependencies
```

## 🌍 Multi-Language Support

The application supports 11 languages:
- 🇺🇸 English
- 🇪🇸 Spanish (Español)
- 🇫🇷 French (Français)
- 🇩🇪 German (Deutsch)
- 🇨🇳 Chinese (中文)
- 🇯🇵 Japanese (日本語)
- 🇵🇹 Portuguese (Português)
- 🇷🇺 Russian (Русский)
- 🇸🇦 Arabic (العربية)
- 🇮🇹 Italian (Italiano)
- 🇮🇳 Hindi (हिन्दी)

Switch languages using the dropdown in the navigation bar.

## 🤖 AI Chatbot Features

The AI chatbot assistant can:
- Search properties by type, price range, and location
- Answer questions about listings
- Capture lead information
- Handle property inquiries
- Maintain conversation context across multiple messages

## 🎨 Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend

```bash
uv run python main.py    # Start backend server
uv sync                  # Install/update dependencies
```

## 📦 Building for Production

### Frontend

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Backend

The backend runs as a Python application. Deploy using:
- Docker
- Heroku
- AWS Lambda
- Google Cloud Run

## 🔧 Configuration

### Sanity CMS Setup

1. Create a Sanity account at [sanity.io](https://www.sanity.io/)
2. Create a new project
3. Set up schemas for:
   - Properties
   - Leads
   - Inquiries
   - Login attempts
4. Get your project ID and create a write token
5. Add credentials to environment variables

### Gemini API Setup

1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to backend `.env` file

## 🐛 Troubleshooting

### Port Already in Use

If port 8001 is blocked:
```bash
# Change PORT in backend/.env
PORT=8002
```

### Backend Import Errors

Make sure to run backend with `uv`:
```bash
uv run python main.py
```

### Frontend Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is private and proprietary.

## 👥 Contact

For questions or support, contact Scott J. Realtor Group:
- 📞 Phone: 210.384.9434
- 📧 Email: scott@scottjrealtor.com
- 🌐 Website: [scottjrealtor.com](https://scottjrealtor.com)

---

Built with ❤️ by Scott J. Realtor Group
