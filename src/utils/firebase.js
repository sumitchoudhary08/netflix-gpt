// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKlb1ud3EtqhpG3cMi8PZca5lkBJ3tRm8",
  authDomain: "netflixgpt-f77bf.firebaseapp.com",
  projectId: "netflixgpt-f77bf",
  storageBucket: "netflixgpt-f77bf.firebasestorage.app",
  messagingSenderId: "375808794774",
  appId: "1:375808794774:web:1d24f543e37bc9cff1a2b7",
  measurementId: "G-VHFSFN8NZ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
