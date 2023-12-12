// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAfUv_3FBELtG78UMsgW4lbLsbUW3G83U",
  authDomain: "cm-security-d6aa6.firebaseapp.com",
  projectId: "cm-security-d6aa6",
  storageBucket: "cm-security-d6aa6.appspot.com",
  messagingSenderId: "383604096349",
  appId: "1:383604096349:web:13fd86b35593a5b7a8bcb4",
  measurementId: "G-Q4E9P078KE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);
export const auth = getAuth()
