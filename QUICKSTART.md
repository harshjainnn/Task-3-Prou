# Quick Start Guide

Follow these steps to get the Employee Task Tracker running:

## Step 1: Prerequisites

Make sure you have Node.js (v18 or higher) installed:
```bash
node --version
```

If not installed, download from [nodejs.org](https://nodejs.org/)

## Step 2: Set Up Backend

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Create `.env` file:**
   Create a file named `.env` in the `server/` directory with:
   ```
   DATABASE_URL="file:./dev.db"
   PORT=4000
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

5. **Create database and run migrations:**
   ```bash
   npm run prisma:migrate
   ```
   (When prompted for a migration name, just press Enter or type "init")

6. **Seed the database (optional but recommended):**
   ```bash
   npm run prisma:seed
   ```

7. **Start the backend server:**
   ```bash
   npm run dev
   ```

   You should see: `Server running on http://localhost:4000`

## Step 3: Set Up Frontend

Open a **new terminal window** (keep the backend running):

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Create `.env` file:**
   Create a file named `.env` in the `client/` directory with:
   ```
   VITE_API_URL=http://localhost:4000
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the frontend:**
   ```bash
   npm run dev
   ```

   You should see: `Local: http://localhost:3000`

## Step 4: Access the Application

Open your browser and go to: **http://localhost:3000**

You should see the Task Tracker dashboard!

## Troubleshooting

### Backend won't start
- Make sure port 4000 is not already in use
- Check that `.env` file exists in `server/` directory
- Verify `npm install` completed successfully

### Frontend can't connect to backend
- Make sure backend is running on port 4000
- Check that `VITE_API_URL` in `client/.env` is correct
- Verify CORS is enabled (it should be by default)

### Database errors
- Make sure you ran `npm run prisma:migrate` first
- Check that `DATABASE_URL` in `server/.env` is correct
- Try deleting `server/dev.db` and running migrations again

### Port already in use
- Backend: Change `PORT=4000` to another port in `server/.env` and update `VITE_API_URL` in `client/.env`
- Frontend: Vite will automatically use the next available port

## Stopping the Servers

- Press `Ctrl + C` in each terminal window to stop the servers

