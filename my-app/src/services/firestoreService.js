import{db} from "../config/firebase";
import { collection,addDoc,getDoc,query,where, getDocs } from "firebase/firestore";

export async function addUser(user) {
    return await addDoc(collection(db,"usuario"),{...user,createdAt: new Date()});
    
}

export async function getProduct(params) {
    const snap= await getDocs(collection(db,"productos"));
    return snap.docs.map(d=>({id: d.id,...d.data()}));
}