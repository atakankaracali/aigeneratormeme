import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdqMl_YoQ0jdNIJ2APp_0X95UX78cFl6Q",
  authDomain: "aigeneratememe.firebaseapp.com",
  projectId: "aigeneratememe",
  storageBucket: "aigeneratememe.firebasestorage.app",
  messagingSenderId: "792859383478",
  appId: "1:792859383478:web:e65954de9fd0ab029c7817",
  measurementId: "G-ZJFZDDJMZ4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
