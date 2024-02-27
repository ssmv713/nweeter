import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABGTdLKPDigkDDMlF4b7bnafc3S4hPtxs",
  authDomain: "fir-tweeter-9c8f7.firebaseapp.com",
  projectId: "fir-tweeter-9c8f7",
  storageBucket: "fir-tweeter-9c8f7.appspot.com",
  messagingSenderId: "933233533989",
  appId: "1:933233533989:web:c4d444de7cd5677673cbcc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
