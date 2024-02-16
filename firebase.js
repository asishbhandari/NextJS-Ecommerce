import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB97f3dPTSMp-d-Ck6PKNIwEtlUGfu976s",
  authDomain: "ecommerce-localmart.firebaseapp.com",
  projectId: "ecommerce-localmart",
  storageBucket: "ecommerce-localmart.appspot.com",
  messagingSenderId: "840397255133",
  appId: "1:840397255133:web:91512783ba48ec8c7e8634"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;