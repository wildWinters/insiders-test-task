import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "insiders-test-task.firebaseapp.com",
  projectId: "insiders-test-task",
  storageBucket: "insiders-test-task.firebasestorage.app",
  messagingSenderId: "167709573895",
  appId: "1:167709573895:web:6e2b36afc3780bf9683ba2",
  measurementId: "G-M7ERWKE7WJ",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
