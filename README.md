# AI Meme Generator

Create funny, dark, motivational, random, or daily challenge memes powered by AI.
Supports Classic, Roast Me, Manifest, Surprise, Fortune, Flavor, and Challenge modes.

Link: [aigeneratememe.com](https://www.aigeneratememe.com/)

---

## ✨ Features

- Seven Meme Modes: Classic, Roast Me, Manifest, Surprise, Fortune, Flavor, Challange
- Daily Challenge Mode (changes every day)
- AI-powered Captions using OpenRouter (ChatGPT-level results)
- Secure Backend with Anti-Prompt-Injection + Rate Limiting
- Meme History with LocalStorage
- Framer Motion animations + Confetti FX + Share Animations
- Mobile-first, fully responsive UI
- Emoji Reactions with Firebase (😂 🔥 😢 etc.)
- Helmet, CORS, sanitized inputs, logs and monitoring
- SEO Optimized (Canonical URLs, Meta Tags)

---

## 🛠️ Tech Stack

- Frontend: React + Vite + Framer Motion
- Backend: Express + OpenRouter AI
- Database: Firebase Firestore
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
FIREBASE_ADMIN_KEY_BASE64=your_base64_key
FIREBASE_PROJECT_ID=your_project_id
```

#### For Frontend (`.env`)
```
VITE_BACKEND_URL=https://your-backend
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
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
- Firebase: Free Spark Plan is enough

---

## ℹ️ Notes

- Logs are automatically saved daily in `/logs`.
- All inputs are filtered against prompt injections.
- Supports OpenRouter free models.
- If you get 429, the rate limit is triggered.
- Inputs are sanitized to avoid prompt injection
- Rate limit = 100 req / 15 min
- Logs saved under /logs folder
- Emoji Reactions are stored in Firestore

---

## 🧑‍💻 Author
Atakan Karacali

- Portfolio: [atakankaracali.com](https://atakankaracali.com/)
- LinkedIn: [in/atakankaracali](https://www.linkedin.com/in/atakankaracali)
- GitHub: [github.com/atakankaracali](https://github.com/atakankaracali)

## 🌟 Support
If you like this project, please star it on GitHub!
Your support helps a lot! ⭐