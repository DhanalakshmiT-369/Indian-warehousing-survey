# SETUP INSTRUCTIONS

## ⚡ Just 3 Things to Change

### 1️⃣ Edit `backend/.env`

Replace everything with your MongoDB Atlas connection:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/survey-db?retryWrites=true&w=majority
JWT_SECRET=mysecretkey
PORT=5000
NODE_ENV=development
```

Get `MONGODB_URI` from: https://www.mongodb.com/cloud/atlas
- Login → Databases → Connect → Copy connection string

### 2️⃣ Install Dependencies

```bash
npm run backend:install
```

### 3️⃣ Run Everything

```bash
npm start
```

---

## 📍 Login Info

**Username:** admin  
**Password:** survey2026

Browser opens: http://localhost:5000

---

## ✅ Done!

That's all you need to change. Everything else is pre-configured.
