import { loginApp } from '../firebase/firebaseFunciones.js'

export const login =() => {
  const templateLogin=`   
        <h1>Ingreso</h1>
        <input id="email2" class="form" name="email" type="email" placeholder="....@gmail.com " required/>
        <input id="password2" class="form" name="contraseña" type="text" placeholder="********** " required/>
        <button type="submit" class="btn2" id="btn2">Acceder</button>
        <span class="link">¿Eres Nuevo aqui? <a id="linkRegister" href="#/Register">Regístrate</a></span>`
  const divLogin = document.createElement('div');
  divLogin.innerHTML= templateLogin;
     
  const boton_SignIn = document.querySelector('#btn2');
  boton_SignIn.addEventListener('click', () => {

        const emailSignIn2 = document.querySelector('#email2').value;
        const passwordSignIn2 = document.querySelector('#password2').value;

        loginApp(emailSignIn2, passwordSignIn2).catch(function(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });
  });

  const btnRegister = divLogin.querySelector('#linkRegister');
  btnRegister.addEventListener('click', () => {
    window.location.hash = '#/Register';
  });

return divLogin;
};