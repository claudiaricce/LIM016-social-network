// Importación de la app de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";

//Importación de los metodos de firebase auth
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    
} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js";

import{
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-storage.js";


// La configuración de Firebase de tu aplicación web
const firebaseConfig = {
    apiKey: "AIzaSyBvcb3grtQsKqFwIP1FWpkaCv7IeXrAE14",
    authDomain: "glow-app-fe108.firebaseapp.com",
    projectId: "glow-app-fe108",
    storageBucket: "glow-app-fe108.appspot.com",
    messagingSenderId: "519645271762",
    appId: "1:519645271762:web:7e319319119d715fd53f0b"
};
// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

// Inicializa Firebase Auth
export const auth = getAuth(app);

//inicializa google con firebase app
export const googleProvider = new GoogleAuthProvider(app);

//inicializa github con github
export const githubProvider = new GithubAuthProvider(app);

//usuario actual
export const user= () =>auth.currentUser;

//inicializa cloud Firebase
export const db= getFirestore(app);

//inicializa Storage
export const storage= getStorage(app);

export {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    signOut,
};

export{
    getFirestore,
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
};

export{
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
};