# MongoDB Atlas Setup Guide

This guide will walk you through setting up a MongoDB Atlas database and connecting it to your HIVE application.

## 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up for a free account.
2. After signing up, you'll be prompted to create a new organization and project.

## 2. Create a Free Cluster

1. Click "Build a Database"
2. Select the FREE "M0" tier
3. Choose your preferred cloud provider (AWS, GCP, or Azure) and region (select one closest to your users)
4. Name your cluster (e.g., "hivesite-cluster")
5. Click "Create" and wait for the cluster to provision (takes a few minutes)

## 3. Configure Database Access

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Create a username and a secure password (save these credentials)
4. Set privileges to "Read and Write to Any Database"
5. Click "Add User"

## 4. Configure Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, select "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: For production, you should restrict this to specific IP addresses
4. Click "Confirm"

## 5. Get Your Connection String

1. Go to "Databases" in the left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user's password
6. Replace `<dbname>` with a name for your database (e.g., "hivesite")

## 6. Update Environment Variables

1. Open the `.env` file in the server directory
2. Replace the `MONGODB_URI` value with your connection string:

```
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.example.mongodb.net/hivesite?retryWrites=true&w=majority
```

## 7. Migrate Data from SQLite (if needed)

If you have existing data in SQLite that you want to migrate to MongoDB:

1. Make sure both SQLite and MongoDB dependencies are installed
2. Run the migration script:

```bash
cd server
node migrate-data.js
```

## 8. Verify Connection

1. Start the server:

```bash
cd server
npm run dev
```

2. Check the console output for "MongoDB connected successfully"

If you run into any issues, check the error messages in the console, verify your connection string, and ensure your network permissions are set correctly. 