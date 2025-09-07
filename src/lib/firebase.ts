import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
// Replace these values with your Firebase project config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDW_WuHzvKEucK6mRGdIGBb5IelS1AXXSE",
  authDomain: "notes-app-540de.firebaseapp.com",
  projectId: "notes-app-540de",
  storageBucket: "notes-app-540de.firebasestorage.app",
  messagingSenderId: "992428333501",
  appId: "1:992428333501:web:ccaf7f70a0c353a3fbdad4",
  measurementId: "G-PV2YDPBPPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
