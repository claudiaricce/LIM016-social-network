import { loginApp } from '../firebase/firebaseFunciones.js'

export const login =() => {
  const templateLogin=`   
        <div id="Logo" class="containerLogin">
        <figure></figure>
        </div>
        <div id="formLogin" class="formStyle">
        <p>Bienvenid@s</p>
        <h1>Glow App</h1>
        <p>Queremos ver tu mejor versión</p>
        <form id="login">
        <input id="email2" class="form" name="email" type="email" placeholder="....@gmail.com " required/>
        <input id="password2" class="stylepass" type="password" placeholder="**********" minlength="5" required/>
        <button type="submit" class="btn2" id="btn2">Acceder</button>
        <p id="verified" class="everified"></p>
        </div>
        </form>
        <div id="lastContainer class="lastContainers">
        <p class="enter"> O inicia sesión con: </p>
        <p id="gh">github </p>
        <p id="google"> google </p>
        <span class="link">¿Eres Nuevo aqui? <a id="linkRegister" href="#/register">Regístrate</a></span>
        </div>
        `
  const divLogin = document.createElement('div');
  divLogin.innerHTML = templateLogin;

  const boton_SignIn = divLogin.querySelector('#btn2');
  boton_SignIn.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.hash = '#/home';

        const emailSignIn2 = divLogin.querySelector('#email2').value;
        const passwordSignIn2 = divLogin.querySelector('#password2').value;
        const errorVerified = divLogin.querySelector('#verified');
        const cleanForm= divLogin.querySelector('#login');

        loginApp(emailSignIn2, passwordSignIn2)
        .then((usuario)=>{
        const userEmail= usuario.user.emailVerified;
            if (userEmail === true) {
                window.location.hash = '#/home';
                console.log('Usuario logueado');
            } else {
              // muestra mensaje de error si no verifico por correo
              errorVerified.innerHTML='Error, cuenta no verificada';
              cleanForm.reset();
            }
        })
        .catch(function(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            //Validaciones de los campos
            if (emailSignIn2 === '' || passwordSignIn2 === '') {
                errorVerified.innerHTML= 'Debes completar todos los campos';
                cleanForm.reset();
              } else if (emailSignIn2 !== '' && errorCode === 'auth/invalid-email') {
                errorVerified.innerHTML= 'La dirección de correo electrónico no es válida';
                cleanForm.reset();
              } else if (errorCode === 'auth/user-disabled') {
                errorVerified.innerHTML= 'El usuario esta desactivado';
                cleanForm.reset();
              } else if (errorCode === 'auth/user-not-found') {
                errorVerified.innerHTML = 'Cuenta no encontrada o incorrecta';
                cleanForm.reset();
              } else if (errorCode === 'auth/wrong-password') {
                errorVerified.innerHTML = 'Contraseña incorrecta';
                cleanForm.reset();
              }

            console.log(errorCode, errorMessage)
            
        });
  });

  const btnRegister = divLogin.querySelector('#linkRegister');
  btnRegister.addEventListener('click', () => {
    window.location.hash = '#/register';
  });

  return divLogin;
};