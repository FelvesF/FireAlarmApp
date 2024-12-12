import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";  // <-- Add Firestore import
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8vfirtzaWDGU5xaySLovq2tYm5LDNJEM",
  authDomain: "fir-proj-b782c.firebaseapp.com",
  projectId: "fir-proj-b782c",
  databaseURL: "https://fir-proj-b782c-default-rtdb.asia-southeast1.firebasedatabase.app", // Updated URL
  storageBucket: "fir-proj-b782c.firebasestorage.app",
  messagingSenderId: "798872675393",
  appId: "1:798872675393:web:a7aed17dc7dacae9be12c0",
  measurementId: "G-G4JJJ193QD"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const storage = getStorage(app);
const db = getFirestore(app);  // <-- Initialize Firestore
const realtimedb = getDatabase(app);

export { auth, storage, db, realtimedb };  // <-- Export Firestore for use
