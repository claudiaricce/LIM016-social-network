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
        <input id="email2" class="form" name="email" type="email" placeholder="....@gmail.com " required/>
        <p id="errorEmail" class="errorLogin" style = "visibility: hidden">Cuenta no encontrada o incorrecta</p>
        <input id="password2" class="stylepass" type="password" placeholder="**********" minlength="5" required/>
        <p id="errorPass" class="errorPass" style = "visibility: hidden">Contraseña incorrecta</p>
        <button type="submit" class="btn2" id="btn2">Acceder</button>
        <p id="verified" class="everified"></p>
        </div>
        <div id="lastContainer class="lastContainers">
        <p class="enter"> O inicia sesión con: </p>
        <p id="gh">github </p>
        <p id="google"> google </p>
        <span class="link">¿Eres Nuevo aqui? <a id="linkRegister" href="#/register">Regístrate</a></span>
        </div>
        `
  const divLogin = document.createElement('div');
  divLogin.innerHTML= templateLogin;
     
  const boton_SignIn = divLogin.querySelector('#btn2');
  boton_SignIn.addEventListener('click', () => {

        const emailSignIn2 = divLogin.querySelector('#email2').value;
        const passwordSignIn2 = divLogin.querySelector('#password2').value;
        const errorVerified = divLogin.querySelector('#verified');
        const errorPassword= divLogin.querySelector('#errorPass');
        const errorEmail= divLogin.querySelector('#errorEmail');

        loginApp(emailSignIn2, passwordSignIn2)
        .then((usuario)=>{
        const userEmail= usuario.user.emailVerified;
            if (userEmail === true) {
                window.location.hash = '#/home';
                console.log('Usuario logueado');
            } else {
                window.location.hash = '#/';
                // muestra mensaje de error si no verifico por correo
                errorVerified.innerHTML='Error, cuenta no verificada';
            }
        })
        .catch(function(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            //Validaciones de los campos
            if (emailSignIn2 === '' || passwordSignIn2 === '') {
                errorVerified.innerHTML= 'Debes completar todos los campos';
              } else if (emailSignIn2 !== '' && errorCode === 'auth/invalid-email') {
                errorEmail.textContent= 'La dirección de correo electrónico no es válida';
              } else if (errorCode === 'auth/user-disabled') {
                errorVerified.innerHTML= 'El usuario esta desactivado';
              } else if (errorCode === 'auth/user-not-found') {
                errorEmail.style.visibility = 'visible';
              } else if (errorCode === 'auth/wrong-password') {
                errorPassword.style.visibility = 'visible';
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