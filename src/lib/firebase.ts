// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "pulse-dating-app-v1",
  appId: "1:197802868471:web:29d288bf7f187685291df2",
  storageBucket: "pulse-dating-app-v1.firebasestorage.app",
  apiKey: "AIzaSyD7brBnrSbbOIOBjF6DKESIGWlYSmVqb90",
  authDomain: "pulse-dating-app-v1.firebaseapp.com",
  messagingSenderId: "197802868471",
  measurementId: "G-FFVMP2RZDD"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
