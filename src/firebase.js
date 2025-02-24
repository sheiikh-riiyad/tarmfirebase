import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyC9lTYGzWVH3W0rv8ItZkxbjSnAABGK7q0",
    authDomain: "tarmfiredatabase.firebaseapp.com",
    databaseURL: "https://tarmfiredatabase-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tarmfiredatabase",
    storageBucket: "tarmfiredatabase.appspot.com",
    messagingSenderId: "960164968588",
    appId: "1:960164968588:web:8f9abb9c7050aa733823a9",
    measurementId: "G-FDNYP08708"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth };
