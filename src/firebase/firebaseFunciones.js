/* =====> REGISTRO DE NUEVO USUARIO <====== */
import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification
} from "./config.js";

/**** Registrar un usuario *******/
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

/**** Inicio de sesión de un usuario registrado ****** */
export const loginApp = (email, password) => signInWithEmailAndPassword(auth, email, password);

/**** Enviando email a usuario registrado ****** */
export const verificateEmail = () => sendEmailVerification(auth.currentUser);