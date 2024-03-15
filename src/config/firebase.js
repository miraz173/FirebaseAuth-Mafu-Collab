import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
//removed, as security to prevent misuse of he storage
  //copy from firebase config file firebase site
};

const app = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);
