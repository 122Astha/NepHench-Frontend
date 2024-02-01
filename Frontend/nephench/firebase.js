import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBFveakbyRancgY9u2PwkKz_xHtrZ_0jJo",
  authDomain: "chat-2cae0.firebaseapp.com",
  projectId: "chat-2cae0",
  storageBucket: "chat-2cae0.appspot.com",
  messagingSenderId: "686752412126",
  appId: "1:686752412126:web:02ffed843318ef5f8e6d4f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
