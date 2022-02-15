/* =====> REGISTRO DE NUEVO USUARIO <====== */
import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    googleProvider,
    gitHubProvider,
    signOut
} from "./config.js";

/**** Registrar un usuario *******/
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

/**** Inicio de sesión de un usuario registrado ****** */
export const loginApp = (email, password) => signInWithEmailAndPassword(auth, email, password);

/**** Enviando email a usuario registrado ****** */
export const verificateEmail = () => sendEmailVerification(auth.currentUser);

/**** Inicio de sesion con google */
export const signInGoogle = () => signInWithPopup(auth, googleProvider);

/**** Inicio de sesión con github */
export const signInGithub = () => signInWithPopup(auth, gitHubProvider);

/**** Cerrar sesión con github */
export const closeUserSession = () => signOut(auth);