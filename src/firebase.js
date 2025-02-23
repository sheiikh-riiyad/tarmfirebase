import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
    apiKey: "AIzaSyC9lTYGzWVH3W0rv8ItZkxbjSnAABGK7q0",
    authDomain: "tarmfiredatabase.firebaseapp.com",
    databaseURL: "https://tarmfiredatabase-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tarmfiredatabase",
    storageBucket: "tarmfiredatabase.firebasestorage.app",
    messagingSenderId: "960164968588",
    appId: "1:960164968588:web:8f9abb9c7050aa733823a9",
    measurementId: "G-FDNYP08708",
    databaseURL: " https://tarmfiredatabase-default-rtdb.asia-southeast1.firebasedatabase.app "
  };


  const app = initializeApp(firebaseConfig);

  // ✅ Optional: Initialize Analytics (only works in browser)
  const analytics = getAnalytics(app);
  
  // ✅ Export app so it can be imported in other files
  export { app };