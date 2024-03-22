import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPCA96ILrQImpo19ODLA3rPa98-rBkPC8",
  authDomain: "truck-management-a4914.firebaseapp.com",
  projectId: "truck-management-a4914",
  storageBucket: "truck-management-a4914.appspot.com",
  messagingSenderId: "1040341919937",
  appId: "1:1040341919937:web:66d2846084d881dc84cc40",
  measurementId: "G-06P9GY1WE4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = firebase.firestore();
const storageDb = getStorage(firebaseApp);

export { auth, storageDb }
export default db