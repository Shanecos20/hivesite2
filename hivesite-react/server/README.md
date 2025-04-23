# HIVE Smart Beekeeping - Backend Server

This is the backend server for the HIVE Smart Beekeeping website. It handles preorder signups by:

1. Storing email addresses in an SQLite database
2. Sending email notifications when products "launch" (simulated as 2 minutes after signup for testing)

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure email:
   For production, update the SMTP settings in `server.js` with your actual email provider credentials.
   For testing, the current Ethereal Email configuration works as a dummy service.

## Running the Server

Development mode (with auto-reload):
```
npm run dev
```

Production mode:
```
npm start
```

## API Endpoints

- `POST /api/preorder` - Register an email for preorder notifications
  - Request body: `{ "email": "user@example.com" }`
  - Responses:
    - 201: Successfully registered
    - 400: Invalid email
    - 409: Email already registered
    - 500: Server error

## Database

The server uses SQLite for data storage in the `preorders.db` file. The database schema includes:

- `preorders` table:
  - `id` - Primary key
  - `email` - User's email (unique)
  - `signup_date` - When the user signed up
  - `notified` - Whether the user has been sent a launch notification 