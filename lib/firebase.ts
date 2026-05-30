import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let _app:       FirebaseApp | null = null;
let _auth:      Auth        | null = null;
let _db:        Firestore   | null = null;
let _analytics: Analytics   | null = null;

function getApp_(): FirebaseApp {
  if (!_app) {
    if (typeof window === "undefined") throw new Error("Firebase must be initialized on the client");
    _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) _auth = getAuth(getApp_());
  return _auth;
}

export function getFirebaseDb(): Firestore {
  if (!_db) _db = getFirestore(getApp_());
  return _db;
}

export function getFirebaseAnalytics(): Analytics | null {
  if (typeof window === "undefined") return null;
  if (!_analytics) _analytics = getAnalytics(getApp_());
  return _analytics;
}

export const googleProvider = new GoogleAuthProvider();
