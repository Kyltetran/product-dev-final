// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config (replace with your own credentials)
const firebaseConfig = {
  apiKey: "AIzaSyBkuDObreW6ZXRmmYdfGxNltSxI6RrP5Ow",
  authDomain: "prodev-final-project.firebaseapp.com",
  projectId: "prodev-final-project",
  storageBucket: "prodev-final-project.firebasestorage.app",
  messagingSenderId: "925743713205",
  appId: "1:925743713205:web:74607138f04a9860b3a7fc",
  measurementId: "G-3SHVEQ3E3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };