import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
         sendEmailVerification, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where, 
         orderBy, doc, setDoc, updateDoc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAwEZFFNafDyRqmFu5FAD1RgtzQgVoC14o",
  authDomain: "lahuertahogar-b75fd.firebaseapp.com",
  projectId: "lahuertahogar-b75fd",
  storageBucket: "lahuertahogar-b75fd.firebasestorage.app",
  messagingSenderId: "387833525199",
  appId: "1:387833525199:web:11452ca1627782baec18ba",
  measurementId: "G-74DHQHQR84"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
         sendEmailVerification, signOut, onAuthStateChanged, collection, addDoc, 
         getDocs, query, where, orderBy, doc, setDoc, updateDoc, getDoc };