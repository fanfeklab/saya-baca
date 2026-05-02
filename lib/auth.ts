import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInAnonymously, 
  onAuthStateChanged,
  linkWithPopup,
  User,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firestore-errors';

export type AuthUser = User & { isAdmin?: boolean };

const ADMIN_EMAIL = 'fanfeklab@gmail.com';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await syncUser(result.user);
    return result.user;
  } catch (error) {
    console.error('Google Sign In Error:', error);
    throw error;
  }
};

export const signInAsGuest = async () => {
  try {
    const result = await signInAnonymously(auth);
    await syncUser(result.user);
    return result.user;
  } catch (error) {
    console.error('Guest Sign In Error:', error);
    throw error;
  }
};

export const linkAccountWithGoogle = async () => {
  if (!auth.currentUser) return;
  const provider = new GoogleAuthProvider();
  try {
    const result = await linkWithPopup(auth.currentUser, provider);
    await syncUser(result.user);
    return result.user;
  } catch (error) {
    console.error('Linking Error:', error);
    throw error;
  }
};

export const signOut = () => firebaseSignOut(auth);

const syncUser = async (user: User) => {
  const path = `accounts/${user.uid}`;
  try {
    const userRef = doc(db, 'accounts', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        id: user.uid,
        email: user.email || null,
        isAnonymous: user.isAnonymous,
        role: user.email === ADMIN_EMAIL ? 'admin' : 'user',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
    } else {
      await setDoc(userRef, {
        lastLogin: serverTimestamp(),
        isAnonymous: user.isAnonymous,
        email: user.email || userDoc.data()?.email
      }, { merge: true });
    }
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.WRITE, path);
    } catch (e) {
      console.error("User sync deferred or failed:", e);
    }
  }
};
