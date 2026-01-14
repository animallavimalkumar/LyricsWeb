# Vercel Deployment Guide for Lyrics Web App

This guide explains how to deploy your Lyrics Web App to Vercel with working backend API routes.

## Why Your Backend Wasn't Working

When deploying to Vercel, traditional Express servers with `app.listen()` don't work because:

1. **Vercel doesn't run long-running servers** - It uses serverless functions instead
2. **Each API endpoint must be a separate serverless function** - Located in the `/api` directory
3. **The Express server in `/server` folder** - Only works for local development

## Project Structure Changes

The following changes have been made to support Vercel deployment:

### New Files Created

```
my-react-app/
├── api/                          # Vercel Serverless Functions
│   ├── translate.js              # POST /api/translate
│   ├── contact.js                # GET/POST /api/contact
│   ├── song-request.js           # GET/POST /api/song-request
│   └── health.js                 # GET /api/health
├── vercel.json                   # Vercel configuration
├── .env.example                  # Environment variables template
└── VERCEL_DEPLOYMENT.md          # This file
```

### Modified Files

- `src/utils/translationService.js` - Updated to use environment variable for API URL
- `src/pages/Contact.jsx` - Updated to use environment variable for API URL
- `src/pages/SongRequest.jsx` - Updated to use environment variable for API URL
- `.env` - Added `VITE_API_URL` variable

## Deployment Steps

### Step 1: Push to GitHub

Make sure your code is pushed to a GitHub repository.

```bash
git add .
git commit -m "Add Vercel serverless functions"
git push origin main
```

### Step 2: Import Project in Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the `my-react-app` folder as the root directory

### Step 3: Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Set Environment Variables (Optional)

In Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | (leave empty) | Uses relative paths by default |
| `NODE_ENV` | `production` | Production environment |

**Note**: For Vercel deployment, `VITE_API_URL` should be empty to use relative paths.

### Step 5: Deploy

Click "Deploy" and wait for the build to complete.

## API Endpoints

After deployment, your API endpoints will be available at:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/translate` | POST | Translate lyrics between languages |
| `/api/contact` | GET/POST | Contact form submissions |
| `/api/song-request` | GET/POST | Song request submissions |
| `/api/health` | GET | Health check endpoint |

### Testing API Endpoints

After deployment, test your endpoints:

```bash
# Health check
curl https://your-app.vercel.app/api/health

# Translation
curl -X POST https://your-app.vercel.app/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "హలో", "targetLanguage": "en"}'

# Contact form
curl -X POST https://your-app.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@example.com", "message": "Hello!"}'
```

## Local Development

For local development, you have two options:

### Option 1: Use Vite Proxy (Recommended)

The `vite.config.js` is already configured to proxy `/api` requests to `localhost:5000`.

1. Start the Express server:
   ```bash
   cd server
   node server.js
   ```

2. In another terminal, start Vite:
   ```bash
   npm run dev
   ```

### Option 2: Use Vercel CLI

Install and use Vercel CLI for local development:

```bash
npm i -g vercel
vercel dev
```

This runs both the frontend and serverless functions locally.

## Important Notes

### Data Persistence

The serverless functions use **in-memory storage** which means:
- Data is lost when the function cold starts
- Each function instance has its own memory

For production, consider using:
- **Vercel KV** - Redis-compatible key-value store
- **Vercel Postgres** - PostgreSQL database
- **MongoDB Atlas** - Cloud MongoDB
- **PlanetScale** - MySQL-compatible database

### CORS

CORS headers are configured in each serverless function to allow cross-origin requests.

### Cold Starts

Serverless functions may have cold starts (initial delay). This is normal behavior.

## Troubleshooting

### 404 on API Routes

1. Check that files are in the `/api` directory
2. Verify `vercel.json` rewrites are correct
3. Ensure function exports `default` handler

### CORS Errors

1. Check browser console for specific error
2. Verify CORS headers in serverless function
3. Test with `curl` to isolate frontend issues

### Build Failures

1. Check Vercel build logs
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility

## File Reference

### vercel.json

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/api/translate", "destination": "/api/translate" },
    { "source": "/api/contact", "destination": "/api/contact" },
    { "source": "/api/song-request", "destination": "/api/song-request" },
    { "source": "/api/health", "destination": "/api/health" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Serverless Function Template

```javascript
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle request
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Hello!' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
```

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review function logs in Vercel dashboard
3. Test API endpoints with curl/Postman
4. Verify environment variables are set correctly
