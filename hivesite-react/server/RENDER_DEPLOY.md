# Deploying to Render

This guide will walk you through deploying your HIVE application's backend to Render.

## 1. Create a Render Account

1. Go to [Render](https://render.com/) and sign up for a free account.
2. Verify your email address and log in.

## 2. Connect Your GitHub Repository

1. In the Render dashboard, click "New" and select "Web Service".
2. Connect your GitHub account if you haven't already.
3. Select the repository containing your HIVE application.

## 3. Configure Your Web Service

1. Configure your web service with the following settings:
   - **Name**: `hivesite-api` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose the region closest to your users
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

2. Scroll down to the "Environment Variables" section and add the following:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `SMTP_HOST`: Your SMTP server host
   - `SMTP_PORT`: Your SMTP server port (usually 587)
   - `SMTP_SECURE`: Set to `false` for most providers
   - `SMTP_USER`: Your email account username
   - `SMTP_PASS`: Your email account password or app password
   - `PORT`: Set to `10000` (Render assigns this port automatically)

3. Click "Create Web Service"

## 4. Wait for Deployment

1. Render will automatically deploy your application. This may take a few minutes.
2. Once the deployment is complete, you'll see a URL for your web service (e.g., `https://hivesite-api.onrender.com`).

## 5. Update Frontend Configuration

1. Update your frontend API configuration with the Render URL:
   - Open `src/config/api.js`
   - Update the `production.baseUrl` value with your Render URL
   - Example: `baseUrl: 'https://hivesite-api.onrender.com'`

## 6. Deploy Frontend to Vercel

1. Install the Vercel CLI: `npm install -g vercel`
2. In your project root, run `vercel` and follow the prompts
3. When asked for the build command, use: `npm run build`
4. When asked for the output directory, use: `dist`

## 7. Test Your Deployment

1. Visit your Vercel-deployed frontend URL
2. Try subscribing with a test email
3. Check the server logs on Render to verify the API calls
4. Verify that the email is stored in MongoDB Atlas

## Notes for Free Tier

- Render free tier web services will spin down after 15 minutes of inactivity
- The first request after inactivity will take a few seconds as the service spins up
- This is normal for free tier services and shouldn't affect your production application significantly

## Troubleshooting

- If you encounter issues, check the Render logs for your web service
- Verify that all environment variables are set correctly
- Ensure your MongoDB Atlas cluster is running and accessible
- Check that your CORS settings are configured properly for cross-domain requests 