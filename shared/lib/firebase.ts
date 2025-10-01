// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "insiders-cea3c.firebaseapp.com",
  projectId: "insiders-cea3c",
  storageBucket: "insiders-cea3c.firebasestorage.app",
  messagingSenderId: "372410687581",
  appId: "1:372410687581:web:ef9f7136fa983a69276db4",
  measurementId: "G-R8H0FT3N47",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
