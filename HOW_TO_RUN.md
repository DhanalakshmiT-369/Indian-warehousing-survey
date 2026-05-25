# 3 STEPS TO RUN

## Step 1: Get MongoDB Atlas Connection String

1. Go to: https://www.mongodb.com/cloud/atlas
2. Login or Create Account (free)
3. Create Cluster (M0 free tier)
4. Create Database User (save username + password)
5. Allow Network Access (0.0.0.0/0)
6. Click "Connect" → "Connect your application"
7. Copy the connection string

Example string:
```
mongodb+srv://myuser:mypass123@cluster0.abc123.mongodb.net/survey-db?retryWrites=true&w=majority
```

---

## Step 2: Edit `backend/.env`

**File location:** `backend/.env`

Replace line with your connection string:

```env
MONGODB_URI=your_connection_string_from_step_1

JWT_SECRET=mysecretkey
PORT=5000
NODE_ENV=development
```

Example:
```env
MONGODB_URI=mongodb+srv://myuser:mypass123@cluster0.abc123.mongodb.net/survey-db?retryWrites=true&w=majority
JWT_SECRET=mysecretkey
PORT=5000
NODE_ENV=development
```

---

## Step 3: Run Commands

**First time:**
```bash
npm run backend:install
```

**Then:**
```bash
npm start
```

**Login with:**
- Username: `admin`
- Password: `survey2026`

**Browser:** http://localhost:5000

---

## That's All!

No other files need to change. Everything else is ready to go.
