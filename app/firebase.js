import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAi3UHF-8pG5a4TvEA8GeUCIsHushJrd_k",
  authDomain: "currency-exchange-8ac66.firebaseapp.com",
  projectId: "currency-exchange-8ac66",
  storageBucket: "currency-exchange-8ac66.firebasestorage.app",
  messagingSenderId: "691063451935",
  appId: "1:691063451935:web:8687904eada91a2b0b802a",
  measurementId: "G-372NBF65H6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };