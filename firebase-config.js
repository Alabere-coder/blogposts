import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDumDUlcktacwg46v0pPH28S1HuwkZBRmU",
    authDomain: "blog-website-72059.firebaseapp.com",
    projectId: "blog-website-72059",
    storageBucket: "blog-website-72059.appspot.com",
    messagingSenderId: "254007084112",
    appId: "1:254007084112:web:bbf829203c8b642cc17d55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()




