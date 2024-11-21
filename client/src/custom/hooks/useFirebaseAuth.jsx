import { firebaseAuth } from '@app/config';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const signIn = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => {
        setLoading(false);
        return res;
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error signing in:', error);
        throw error;
      });
  };

  const signUp = async (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        setLoading(false);
        return userCredential;
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error signing up:', error);
        throw error;
      });
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(firebaseAuth, provider)
      .then((res) => {
        setLoading(false);
        return res;
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error signing in with Google:', error);
        throw error;
      });
  };

  const signInWithFacebook = async () => {
    setLoading(true);
    const provider = new FacebookAuthProvider();
    return signInWithPopup(firebaseAuth, provider)
      .then((res) => {
        setLoading(false);
        return res;
      })
      .catch(async (error) => {
        setLoading(false);
      });
  };

  const signOutUser = async () => {
    setLoading(true);
    return signOut(firebaseAuth)
      .then(() => {
        setLoading(false);
        setUser(null);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error signing out:', error);
        throw error;
      });
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    signOut: signOutUser,
  };
}