/* =====> REGISTRO DE NUEVO USUARIO <====== */
import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    googleProvider,
    githubProvider,
    signOut,
    db,
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot

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
export const signInGithub = () => signInWithPopup(auth, githubProvider);

/**** Cerrar sesión con github */
export const closeUserSession = () => signOut(auth);

/***FUNCIONES PARA EL FIRESTORE ****/
 




//POSTS
//guardar los posts
export const addPost= async (name,postText,photoURL, idUser) => {
    console.log(name,postText,photoURL,idUser)
    try {
    const docRef = await addDoc(collection(db, "posts"), {
        userIdent: idUser,
        userPhotoPost:photoURL,
        userWhoPublishes: name,
        publishedText: postText,
        publicationDate: serverTimestamp(),
        likesPost: [],
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
//obtener todos los posts
export const getPosts = () => getDocs(query(collection(db, 'posts')));

//Obtener los posts en tiempo real
export const realTimePosts = (callback) => onSnapshot(query(collection(db, 'posts'), orderBy('timestamp')), callback);

