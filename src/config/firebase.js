// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC-ZWEIyiAZLtaoOtk0op1cIrZm7dI1T68',
  authDomain: 'fir-5f930.firebaseapp.com',
  projectId: 'fir-5f930',
  storageBucket: 'fir-5f930.appspot.com',
  messagingSenderId: '634724109172',
  appId: '1:634724109172:web:88a3406a85cdd0eeaefa21',
  measurementId: 'G-6P5X7WRE80',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
