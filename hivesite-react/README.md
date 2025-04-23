# HIVE Smart Beekeeping Website

This repository contains the code for the HIVE Smart Beekeeping website, built with React and Express.

## Project Structure

- `src/` - Frontend React application
- `server/` - Backend Express.js API
- `public/` - Static assets

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd server && npm install
   ```

### Configuration

1. Set up MongoDB Atlas (see `server/MONGODB_SETUP.md` for detailed instructions)
2. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URI=your_connection_string
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_SECURE=false
   SMTP_USER=your_email
   SMTP_PASS=your_password
   PORT=5000
   ```

### Development

Run the frontend and backend concurrently:
```bash
npm run start
```

Or separately:
```bash
# Frontend only
npm run dev

# Backend only
npm run server
```

### Data Migration

If you have existing data in SQLite that you need to migrate to MongoDB:
```bash
cd server
node migrate-data.js
```

## Deployment

### Backend (Render)

See `server/RENDER_DEPLOY.md` for detailed deployment instructions.

### Frontend (Vercel)

1. Update the API endpoint in `src/config/api.js` with your production backend URL.
2. Deploy to Vercel:
   ```bash
   npm install -g vercel
   vercel
   ```

## License

This project is proprietary and confidential. Unauthorized copying, transferring, or reproduction of the contents of this repository, via any medium, is strictly prohibited.
