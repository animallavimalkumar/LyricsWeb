# Railway Deployment Guide

## Prerequisites
- Railway account
- Git repository

## Steps to Deploy

### 1. Set up Railway Project
1. Go to [Railway.app](https://railway.app) and sign in
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Connect your repository

### 2. Add MySQL Database
1. In your Railway project, click "Add Plugin"
2. Select "MySQL"
3. The database will be automatically provisioned

### 3. Environment Variables
Railway automatically provides database environment variables. Ensure your app uses:

- `MYSQL_HOST` - Database host
- `MYSQL_USER` - Database user
- `MYSQL_PASSWORD` - Database password
- `MYSQL_DATABASE` - Database name
- `MYSQL_PORT` - Database port (usually 3306)
- `NODE_ENV` - Set to 'production'

### 4. Deploy Backend
1. Railway will automatically deploy when you push to your main branch
2. Or manually trigger deployment in the Railway dashboard

### 5. Run Database Setup
After deployment, run the table creation script:
```bash
railway run node check_and_create_tables.js
```

### 6. Update Frontend API URLs
Update your frontend to point to the Railway backend URL instead of Vercel.

## Environment Variables Reference
```
MYSQL_HOST=containers-us-west-xxx.railway.app
MYSQL_USER=root
MYSQL_PASSWORD=your-password
MYSQL_DATABASE=railway
MYSQL_PORT=3306
NODE_ENV=production
```

## Testing
- Test contact form submissions
- Test song request submissions
- Verify data persists in the database
