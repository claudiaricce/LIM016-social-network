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
    serverTimestamp

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

//guardar los posts
export const addPost = async (name, postText, photoURL, idUser) => {
    console.log(name, postText, photoURL, idUser)
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            userIdent: idUser,
            userPhotoPost: photoURL,
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

/**** Crear coleccion cuando se REGISTRE un usuario */
export const addUser = async (name, email, user) => {
    console.log(name, email, user)
    const docRefUser = await addDoc(collection(db, "user"), {
        nameUser: name,
        emailUser: email,
        IdUserActive: user.uid,
    });
    console.log("Document written with ID: ", docRefUser.id);
}

/**** Crear coleccion cuando un usuario inicie sesión con GMAIL  */
export function addUserGmail(user) {
    let nameGmail = 0;
    let photoGmail = '';
    if (user.displayName !== null && user.photoURL !== null) { //si tiene nombre y foto la obtengo
        nameGmail = user.displayName;
        photoGmail = user.photoURL;
    }
    return addDoc(collection(db, "user"), {  //este es la coleccion que voy a retornar cuando ingrese con gmail 
        nameUser: nameGmail,
        emailUser: user.email,
        IdUserActive: user.uid,
        photoGmail: photoGmail,
    });
}

/**** Crear colección cuando el usuario edita el perfil */
export const editProfile = async (postText, idUser) => {
    console.log(postText, idUser)
    const docRefProfile = await addDoc(collection(db, "editProfile"), {
        userIdent: idUser,
        publishedText: postText,
    });
    console.log("Document written with ID: ", docRefProfile.id);
}

////////////////OBTENER DATOS/////////////////
/**** Obtener datos de Usuario en el Perfil */
export const getDataUser = () => getDocs(collection(db, "user"));

/**** Obtener description del perfil del usuario cuando la edita */
export const getEditProfile = () => getDocs(collection(db, "editProfile"));
