import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY || null,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN || null,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID || null,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET || null,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID || null,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID || null,
};

const firebase = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();


export default firebase;

