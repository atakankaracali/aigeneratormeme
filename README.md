# AI Meme Generator

Generate funny, dark, motivational, or sarcastic memes powered by AI. Supports Classic, Roast, and Manifest modes. Built with React, Express, OpenRouter, and hosted on Vercel & Railway.

---

## ✨ Features

- ✅ Viral-style AI-generated meme captions
- ✅ 3 Meme Modes: Classic / Roast / Manifest
- ✅ Secure Backend (Anti-Injection + Input Sanitization)
- ✅ Rate Limiting & Logging
- ✅ Fully responsive frontend
- ✅ Meme history & local storage
- ✅ Free & production ready

---

## 🛠️ Tech Stack

- Frontend: React + Vite + Framer Motion
- Backend: Express + OpenRouter AI
- Deployment: Vercel (Frontend) + Railway (Backend)
- Security: Helmet, CORS, Rate Limiter, Custom Prompt Injection Protection

---

## 🚀 Installation

### 1️⃣ Clone
```bash
git clone https://github.com/atakankaracali/aigeneratormeme
cd aigeneratormeme
```

### 2️⃣ Environment Variables

Create two `.env` files:

#### For Backend (`backend/.env`)
```
OPENROUTER_API_KEY=your_key
ALLOWED_ORIGINS=https://www.aigeneratememe.com
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

#### For Frontend (`frontend/.env`)
```
VITE_BACKEND_URL=https://your-backend
```

---

### 3️⃣ Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

---

### 4️⃣ Local Development

#### Backend
```bash
cd backend
npm run dev
```

#### Frontend
```bash
cd ../frontend
npm run dev
```

Frontend will be available at `http://localhost:5173`  
Backend will be available at `http://localhost:8080`

---

## ✅ Production

- Frontend: Deploy to Vercel
- Backend: Deploy to Railway

---

## ℹ️ Notes

- Logs are automatically saved daily in `/logs`.
- All inputs are filtered against prompt injections.
- Supports OpenRouter free models.
- If you get 429, the rate limit is triggered.

---