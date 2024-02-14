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
  apiKey: "AIzaSyAg_8IkjlgpeEvJUZAgtZMldLQQ_4L4LX8",
  authDomain: "absolute-it-fafe6.firebaseapp.com",
  projectId: "absolute-it-fafe6",
  storageBucket: "absolute-it-fafe6.appspot.com",
  messagingSenderId: "651466419253",
  appId: "1:651466419253:web:d9e99ec59c62c1df7c157c",
  measurementId: "G-ZCHY54TE7P",
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
