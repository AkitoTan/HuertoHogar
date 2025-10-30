import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
         sendEmailVerification, signOut, onAuthStateChanged } 
from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, 
         orderBy, doc, setDoc, updateDoc, getDoc } 
from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwEZFFNafDyRqmFu5FAD1RgtzQgVoC14o",
  authDomain: "lahuertahogar-b75fd.firebaseapp.com",
  projectId: "lahuertahogar-b75fd",
  storageBucket: "lahuertahogar-b75fd.appspot.com", // Corrige typo: debe ser .appspot.com
  messagingSenderId: "387833525199",
  appId: "1:387833525199:web:11452ca1627782baec18ba",
  measurementId: "G-74DHQHQR84"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
         sendEmailVerification, signOut, onAuthStateChanged, collection, addDoc, 
         getDocs, query, where, orderBy, doc, setDoc, updateDoc, getDoc };
