# Sanity Integration Guide

## Overview
This project now integrates Sanity CMS for managing contact form leads and property listings.

## Project Structure
```
Real_State_App/
├── src/
│   ├── lib/
│   │   └── sanity.ts          # Sanity client configuration
│   └── pages/
│       └── Contact.tsx         # Contact form with Sanity integration
├── sanity-studio/              # Sanity Studio (CMS Dashboard)
│   ├── schemaTypes/
│   │   ├── lead.ts            # Lead schema
│   │   ├── property.ts        # Property schema
│   │   └── index.ts
│   ├── sanity.config.ts
│   └── package.json
└── .env                        # Environment variables
```

## Environment Variables
Your `.env` file contains:
```
VITE_SANITY_PROJECT_ID=sq2wmzn5
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=your_token_here
```

## How to Use

### 1. Start Your React App
```bash
npm run dev
```
Your app will run at `http://localhost:3000`

### 2. Start Sanity Studio (CMS Dashboard)
Open a new terminal and run:
```bash
cd sanity-studio
npm run dev
```
Sanity Studio will run at `http://localhost:3333`

### 3. Access Sanity Studio
1. Open `http://localhost:3333` in your browser
2. Log in with your Sanity account
3. You'll see two content types:
   - **Leads**: Contact form submissions
   - **Properties**: Property listings

## Features Implemented

### ✅ Contact Form Integration
- Contact form at `/contact` now saves submissions to Sanity
- Form includes: firstName, lastName, email, phone, subject, message
- Success/error notifications
- Form validation
- Auto-reset after successful submission

### ✅ Lead Management Schema
Fields in Sanity:
- First Name, Last Name (required)
- Email (required, validated)
- Phone
- Subject (dropdown: Buying/Selling/Investment/General)
- Message
- Status (New/Contacted/Qualified/Closed)
- Submitted At (auto-timestamp)

### ✅ Property Management Schema
Fields in Sanity:
- Title, Price (required)
- Address, City, State, ZIP
- Beds, Baths, Square Feet
- Property Type (Single Family/Condo/Townhouse/Land/Luxury)
- Status (Active/Pending/Sold)
- Images (multiple with hotspot)
- Description, Features
- Neighborhood, Year Built, Lot Size

## Next Steps

### To Fetch Properties from Sanity
Use the helper functions in `src/lib/sanity.ts`:

```typescript
import { fetchProperties, fetchPropertyById } from '../lib/sanity';

// Fetch all properties
const properties = await fetchProperties();

// Fetch single property
const property = await fetchPropertyById('property-id');
```

### To Display Images
Install image URL builder (already installed):
```typescript
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '../lib/sanity';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

// Use in component
<img src={urlFor(property.images[0]).width(800).url()} alt={property.title} />
```

### Deploy Sanity Studio
When ready to deploy your CMS:
```bash
cd sanity-studio
npm run deploy
```
This creates a hosted version at `https://your-project.sanity.studio`

## Testing the Integration

1. Start both servers (React app + Sanity Studio)
2. Go to `http://localhost:3000/contact`
3. Fill out and submit the contact form
4. Check `http://localhost:3333` to see the lead appear in Sanity Studio
5. You can manage lead status, add notes, etc. in the Studio

## Troubleshooting

### CORS Issues
If you get CORS errors, add your domain to Sanity CORS settings:
1. Go to `https://sanity.io/manage`
2. Select your project
3. Go to Settings > API > CORS Origins
4. Add `http://localhost:3000` and your production domain

### Token Permissions
Make sure your token has write permissions:
1. Go to `https://sanity.io/manage`
2. Select your project
3. Go to Settings > API > Tokens
4. Ensure your token has "Editor" or "Administrator" permissions

## API Reference

### submitLead(data)
Submits a contact form lead to Sanity.

```typescript
await submitLead({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '210-555-0100',
  subject: 'Buying a Home',
  message: 'I am interested in...'
});
```

### fetchProperties()
Fetches all properties from Sanity.

### fetchPropertyById(id)
Fetches a single property by ID.

## Resources
- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity React Guide](https://www.sanity.io/guides/sanity-and-react)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
