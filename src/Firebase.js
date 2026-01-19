import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBrqsxfpgvnranZURCMdJqcXqvYXtjv1dg",
  apiKey: "AIzaSyBYu9xgTLz2v63O_Ym8ppmtAMddIcWzonM",
  authDomain: "kuber-55702.firebaseapp.com",
  databaseURL: "https://kuber-55702-default-rtdb.firebaseio.com",
  projectId: "kuber-55702",
  storageBucket: "kuber-55702.appspot.com",
  messagingSenderId: "69266128350",
  appId: "1:69266128350:web:b250f57d6b32527604b14f",
  measurementId: "G-QTTM5VPJ3J",
});

// Initialize Firebase
var db = firebaseApp.firestore();
export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
export { db };
