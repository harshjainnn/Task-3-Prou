# Troubleshooting: "Error loading dashboard"

## Common Causes & Solutions

### 1. Backend Server Not Running
**Symptom:** Error loading dashboard, no data appears

**Solution:**
- Open a terminal and navigate to the `server` directory
- Run: `npm run dev`
- You should see: `Server running on http://localhost:4000`
- Keep this terminal open while using the app

### 2. Missing or Incorrect .env File
**Symptom:** Frontend can't connect to backend

**Check:**
- `client/.env` file exists with: `VITE_API_URL=http://localhost:4000`
- `server/.env` file exists with: `DATABASE_URL="file:./dev.db"` and `PORT=4000`

**Solution:**
- Create the `.env` files if they don't exist
- After creating `client/.env`, restart the frontend server (stop with Ctrl+C, then run `npm run dev` again)

### 3. Database Not Initialized
**Symptom:** Backend runs but returns errors

**Solution:**
```bash
cd server
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 4. Port Already in Use
**Symptom:** Backend won't start or shows port error

**Solution:**
- Check if port 4000 is already in use
- Change `PORT=4000` to `PORT=4001` in `server/.env`
- Update `VITE_API_URL=http://localhost:4001` in `client/.env`
- Restart both servers

### 5. CORS Issues
**Symptom:** Network errors in browser console

**Solution:**
- The backend already has CORS enabled
- Make sure backend is running before starting frontend

## Debugging Steps

1. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for error messages (they will now show more details)

2. **Check Network Tab:**
   - Open Developer Tools (F12)
   - Go to Network tab
   - Try refreshing the dashboard
   - Look for failed requests to `/dashboard`
   - Check the status code and error message

3. **Test Backend Directly:**
   - Open browser and go to: `http://localhost:4000/dashboard`
   - You should see JSON data like: `{"totalTasks":4,"completedTasks":1,"completionRate":25}`
   - If this doesn't work, the backend has an issue

4. **Check Backend Terminal:**
   - Look for any error messages in the terminal where backend is running
   - Check if database connection errors appear

## Quick Fix Checklist

- [ ] Backend server is running (`npm run dev` in `server/` directory)
- [ ] Frontend server is running (`npm run dev` in `client/` directory)
- [ ] `client/.env` file exists with correct `VITE_API_URL`
- [ ] `server/.env` file exists with correct `DATABASE_URL` and `PORT`
- [ ] Database is initialized (ran `prisma:migrate`)
- [ ] No port conflicts (check if another app is using port 4000)
- [ ] Restarted frontend after creating/editing `.env` file

## Still Not Working?

1. **Clear browser cache** and hard refresh (Ctrl+Shift+R)
2. **Check the browser console** for detailed error messages
3. **Verify the API URL** - the console will now log all API requests
4. **Test the backend endpoint directly** in browser: `http://localhost:4000/dashboard`

