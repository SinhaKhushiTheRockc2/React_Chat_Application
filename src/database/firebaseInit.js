// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWJv5rZnN-cxi7DAQ205HsGzyg7C5Tpdw",
  authDomain: "chat-application-react-3be36.firebaseapp.com",
  projectId: "chat-application-react-3be36",
  storageBucket: "chat-application-react-3be36.appspot.com",
  messagingSenderId: "480818157072",
  appId: "1:480818157072:web:41db5ec9fe187040685c95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);