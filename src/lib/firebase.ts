// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnjZC9IJp_kWdTaPzB0nSGlp1SOWkMZBw",
    authDomain: "recipshare.firebaseapp.com",
    projectId: "recipshare",
    storageBucket: "recipshare.firebasestorage.app",
    messagingSenderId: "53204426527",
    appId: "1:53204426527:web:97aa4617b315c0ae50da2a",
    measurementId: "G-BBPLQBN31K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics = null;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
});

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export { app, analytics };
export default app;
