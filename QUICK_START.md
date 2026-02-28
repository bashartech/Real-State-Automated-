# Quick Start Guide - Sanity Integration

## ✅ What Has Been Completed

### 1. Installed Packages
- `@sanity/client` - For connecting to Sanity from React
- `@sanity/image-url` - For handling Sanity images

### 2. Created Sanity Client (`src/lib/sanity.ts`)
- Configured with your project credentials from `.env`
- Helper functions:
  - `submitLead()` - Save contact form submissions
  - `fetchProperties()` - Get all properties
  - `fetchPropertyById()` - Get single property

### 3. Updated Contact Form (`src/pages/Contact.tsx`)
- Form now saves to Sanity when submitted
- Shows success/error messages
- Auto-resets after successful submission
- All fields are properly connected

### 4. Created Sanity Studio (`sanity-studio/`)
- Complete CMS dashboard setup
- Two content types configured:
  - **Leads** - Contact form submissions
  - **Properties** - Property listings

## 🚀 How to Start

### Terminal 1 - React App
```bash
npm run dev
```
Access at: http://localhost:3000

### Terminal 2 - Sanity Studio
```bash
cd sanity-studio
npm run dev
```
Access at: http://localhost:3333

## 🧪 Test the Integration

1. Start both servers (React app + Sanity Studio)
2. Go to http://localhost:3000/contact
3. Fill out the contact form and submit
4. Go to http://localhost:3333
5. Log in with your Sanity account
6. Check the "Leads" section - your submission should appear!

## 📋 Sanity Studio Features

### Lead Management
- View all contact form submissions
- Update lead status (New → Contacted → Qualified → Closed)
- See submission timestamps
- Filter and search leads

### Property Management
- Add/edit property listings
- Upload multiple images
- Set property status (Active/Pending/Sold)
- Manage all property details

## 🔑 Important CORS Setup

Before testing, you need to add CORS origins in Sanity:

1. Go to https://sanity.io/manage
2. Select your project (sq2wmzn5)
3. Go to **Settings → API → CORS Origins**
4. Click **Add CORS Origin**
5. Add these origins:
   - `http://localhost:3000` (for development)
   - `http://localhost:5173` (if using Vite default port)
   - Your production domain (when deploying)

## 📝 Next Steps

### Option 1: Test Contact Form
1. Start both servers
2. Submit a test contact form
3. Verify it appears in Sanity Studio

### Option 2: Add Properties
1. Open Sanity Studio (http://localhost:3333)
2. Click "Properties"
3. Add sample property listings
4. Later, fetch them in your React app using `fetchProperties()`

### Option 3: Deploy Sanity Studio
```bash
cd sanity-studio
npm run deploy
```
This creates a hosted CMS at: https://your-project.sanity.studio

## 🛠️ Troubleshooting

### "Failed to fetch" error
- Check CORS settings (see above)
- Verify your token has write permissions

### "Unauthorized" error
- Check `.env` file has correct credentials
- Restart React dev server after changing `.env`

### Sanity Studio won't start
- Make sure you're in the `sanity-studio` directory
- Run `npm install` if needed

## 📚 Documentation
See `SANITY_INTEGRATION.md` for detailed documentation.
