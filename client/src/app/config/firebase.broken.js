// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE,
//   projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
// };

// export const vapidKey = import.meta.env.VITE_APP_FIREBASE_VAPID_KEY || null;

// const isIncognito = async () => {
//   return new Promise((resolve) => {
//     const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
//     if (!fs) {
//       resolve(false);
//     } else {
//       fs(window.TEMPORARY, 100, () => resolve(false), () => resolve(true));
//     }
//   });
// };

// let messaging;
// const initializeFirebase = async () => {
//   const incognito = await isIncognito();
//   if (incognito) {
//     console.warn('Firebase Messaging is disabled in incognito mode.');
//     return;
//   }

//   const app = initializeApp(firebaseConfig);
//   messaging = getMessaging(app);
// };

// export const requestFCMToken = async () => {
//   if (!messaging) {
//     console.warn('Firebase Messaging is not initialized.');
//     return null;
//   }

//   try {
//     const currentToken = await getToken(messaging, { vapidKey });
//     if (currentToken) {
//       console.log('FCM Token:', currentToken);
//       return currentToken;
//     } else {
//       console.log('No registration token available. Request permission to generate one.');
//     }
//   } catch (error) {
//     console.error('An error occurred while retrieving token. ', error);
//   }
// };

// initializeFirebase();

// export const firebase = initializeApp(firebaseConfig);
// export const firebaseAuth = getAuth();
// export { messaging, onMessage };