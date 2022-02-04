//Componentes para autenticación de firebase

//creación de usuario - REGISTRO
export function createUser(email, pass) {
    const auth = firebase.auth();
    return auth.createUserWithEmailAndPassword(email, pass);
  }
  