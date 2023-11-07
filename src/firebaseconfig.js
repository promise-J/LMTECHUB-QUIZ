// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD80ZdGqgyGJTMI3mqv7i_OuqXPIbOHqNw",
  authDomain: "nord-simple-app.firebaseapp.com",
  projectId: "nord-simple-app",
  storageBucket: "nord-simple-app.appspot.com",
  messagingSenderId: "317999005001",
  appId: "1:317999005001:web:5a85867ba7d553d23aee98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
