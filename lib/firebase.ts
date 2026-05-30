import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function initFirebase(): FirebaseApp | null {
  if (typeof window === "undefined") return null;
  if (!firebaseConfig.apiKey) return null;
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

function getFirebaseApp(): FirebaseApp | null {
  if (!_app) _app = initFirebase();
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) {
    const app = getFirebaseApp();
    if (!app) throw new Error("Firebase not initialized");
    _auth = getAuth(app);
  }
  return _auth;
}

export function getFirebaseDb(): Firestore {
  if (!_db) {
    const app = getFirebaseApp();
    if (!app) throw new Error("Firebase not initialized");
    _db = getFirestore(app);
  }
  return _db;
}

export const googleProvider = new GoogleAuthProvider();

// Convenience re-exports for components that run client-side only
export const auth = {
  get current() { return getFirebaseAuth(); },
};
export const db = {
  get current() { return getFirebaseDb(); },
};
