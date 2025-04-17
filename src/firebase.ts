import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aigeneratememe.firebaseapp.com",
  projectId: "aigeneratememe",
  storageBucket: "aigeneratememe.firebasestorage.app",
  messagingSenderId: "792859383478",
  appId: "1:792859383478:web:e65954de9fd0ab029c7817",
  measurementId: "G-ZJFZDDJMZ4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
