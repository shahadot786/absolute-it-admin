import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  arrayUnion,
  arrayRemove,
  orderBy,
  limit,
  query,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref as storageRef } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlV-CwChTSXHqD4M2H4Pvy_9DHY_T-O-Y",
  authDomain: "absit-admin.firebaseapp.com",
  projectId: "absit-admin",
  storageBucket: "absit-admin.appspot.com",
  messagingSenderId: "256597994147",
  appId: "1:256597994147:web:323e5c033b8eab4633ad16",
  measurementId: "G-P6NZS8932J",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const database = getDatabase();
const auth = getAuth();
const storage = getStorage(app);

export {
  app,
  db,
  auth,
  database,
  ref,
  set,
  storage,
  storageRef,
  useUploadFile,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  arrayUnion,
  arrayRemove,
  orderBy,
  limit,
  query,
  getDocs,
};
