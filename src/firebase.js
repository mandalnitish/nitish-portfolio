// Firebase core
import { initializeApp } from "firebase/app";

// Firestore (for Blog)
import { getFirestore } from "firebase/firestore";

// (Optional) Analytics – safe to remove if you want
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDDyDiIMoOuWH-UxDxgF08XtJpELxLviP8",
  authDomain: "nitishportfolio19.firebaseapp.com",
  projectId: "nitishportfolio19",
  storageBucket: "nitishportfolio19.firebasestorage.app",
  messagingSenderId: "143288728292",
  appId: "1:143288728292:web:c53905d1d606352d6f0af1",
  measurementId: "G-P05SSSWVBR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance (IMPORTANT)
export const db = getFirestore(app);

// Analytics (optional)
export const analytics = getAnalytics(app);

export default app;
