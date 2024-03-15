import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuI6qWnKp3ky_bqdl9Dxuocp4O7ggqMsI",
  authDomain: "miraz-fa035.firebaseapp.com",
  databaseURL: "https://miraz-fa035.firebaseio.com",
  projectId: "miraz-fa035",
  storageBucket: "miraz-fa035.appspot.com",
  messagingSenderId: "130767717396",
  appId: "1:130767717396:web:ff0bc1b023207d154bd301",
  measurementId: "G-KFJ0P2LYKB",
};

const app = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);