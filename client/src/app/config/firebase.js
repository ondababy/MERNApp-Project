
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

export const vapidKey = import.meta.env.VITE_APP_FIREBASE_VAPID_KEY || null;

export const firebase = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();
export const messaging = getMessaging(firebase);
export const requestFCMToken = async () => {
  return Notification.requestPermission().then((notif)=> {
    if (notif === 'granted') {
      return getToken(messaging, {vapidKey: vapidKey}).then((token) => {
        return token
      });
    } else {
      throw new Error("Permission denied");
    }
  }).catch((err) => {
    console.log("Error getting FCM token: ", err);
  });
};