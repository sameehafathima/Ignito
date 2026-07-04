// Firebase is optional. If env vars are not configured, the app falls back
// to a local-only mode (form submissions are logged, not persisted) so the
// site remains fully functional out of the box.
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let db = null;
if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

/**
 * Submits a contact/registration form entry to Firestore's "transmissions"
 * collection. Falls back to a console log + resolved promise when Firebase
 * hasn't been configured, so the UI flow works in local/demo environments.
 */
export async function submitTransmission(data) {
  if (!isFirebaseConfigured || !db) {
    console.info('[demo mode] Transmission received (Firebase not configured):', data);
    return { ok: true, demo: true };
  }
  await addDoc(collection(db, 'transmissions'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return { ok: true, demo: false };
}
