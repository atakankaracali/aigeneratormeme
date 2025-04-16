# AI Meme Generator

Generate funny, dark, motivational, or sarcastic memes powered by AI. Supports Classic, Roast, and Manifest modes. Built with React, Express, OpenRouter, and hosted on Vercel & Railway.

Link: [aigeneratememe.com](https://www.aigeneratememe.com/)

---

## ✨ Features

- Three Meme Modes: Classic, Roast Me, and Manifest (motivational)
- AI-powered Captions using OpenRouter (ChatGPT-level results)
- Secure Backend with Anti-Prompt-Injection + Rate Limiting
- Meme History with LocalStorage
- Framer Motion animations + Confetti FX
- Mobile-first, fully responsive UI
- Helmet, CORS, and sanitized inputs
- Logs + Monitoring enabled

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

#### For Frontend (`.env`)
```
VITE_BACKEND_URL=https://your-backend
```

---

### 3️⃣ Install Dependencies

#### Backend
```bash
cd backend
cd backend && npm install
cd ../frontend && npm install
```

#### Frontend
```bash
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
- Inputs are sanitized to avoid prompt injection
- Rate limit = 100 req / 15 min
- Logs saved under /logs folder

---

## 🧑‍💻 Author
Atakan Karacali

- Portfolio: [atakankaracali.com](https://atakankaracali.com/)
- LinkedIn: [in/atakankaracali](https://www.linkedin.com/in/atakankaracali)
- GitHub: [github.com/atakankaracali](https://github.com/atakankaracali)
