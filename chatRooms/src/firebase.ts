import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAu_tjSetJg0T0LmS2cia2wHfh5bsmEUoo",
    authDomain: "chatrooms-8ea1d.firebaseapp.com",
    projectId: "chatrooms-8ea1d",
    storageBucket: "chatrooms-8ea1d.appspot.com",
    messagingSenderId: "787600061112",
    appId: "1:787600061112:web:540934253044f9b123ba4d"
  };
  
  // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);