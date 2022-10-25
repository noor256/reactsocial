// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOHJuGavAIZyJfzU8O10Hi5MNHlCdOMwU",
  authDomain: "reactsocial-842b6.firebaseapp.com",
  projectId: "reactsocial-842b6",
  storageBucket: "reactsocial-842b6.appspot.com",
  messagingSenderId: "1004356945457",
  appId: "1:1004356945457:web:8fe280431ae973dbb03710"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
