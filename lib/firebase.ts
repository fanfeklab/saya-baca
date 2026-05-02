import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);

// Diagnostic connection test - non-blocking
if (typeof window !== 'undefined') {
  import('firebase/firestore').then(({ doc, getDoc }) => {
    getDoc(doc(db, 'test', 'connection')).catch(() => {
      // Quietly handle initial offline state
      console.log("Firebase starting in offline-first mode or server unreachable.");
    });
  });
}
