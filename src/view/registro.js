import { createUser } from '../firebase/firebaseFunciones.js'

export const register = () => {
    const sectionSignUp = document.createElement('section');
    sectionSignUp.classList.add('sectionSignUp'); //la clase para la section 
    sectionSignUp.innerHTML = `
        <div class="divSignUp">
            <h1>
                Registrate
            </h1>
            <input id="name" class="form" name="nombre" type="text" placeholder="Nombre completo" required/>
            <input id="email" class="form" name="email" type="email" placeholder="email" required/>
            <input id="password" class="form" name="contraseña" type="password" placeholder="********** " required/>
            <p id="error-message" style="display:none"></p>
            <h5 class="textPrivacidad">
                Al hacer clic en registrarte, aceptas nuestras Condiciones, Política de datos y la política de cookies. 
            </h5>
            <button type="submit" class="btn" id="btn">
                Registrate
                </button>
            <span class="link"> 
                Ya tienes una cuenta 
                    <a id="linkLogIn" href="#/">
                        Ingresar
                    </a>
            </span>
        </div>

        <!--Este es el modal de información-->
     <div class="modal-container" style="display: none">
         <div class="modal-content">
           <p id="message"></p>
           <button class="modal-btn">Aceptar</button>
          </div>
    </div>`

    /************Boton que Registra y te lleva al Inicio de Sesión**************/
    const boton_SignUp = sectionSignUp.querySelector('#btn');
    boton_SignUp.addEventListener('click', (e) => {
        e.preventDefault()
        //window.location.hash = '#/';
        const nameUserNew = sectionSignUp.querySelector('#name').value;
        const emailSignUp = sectionSignUp.querySelector('#email').value;
        const passwordSignUp = sectionSignUp.querySelector('#password').value;

        /************Variable que contiene el método que permite registrar un usuario nuevo***********/
        createUser(emailSignUp, passwordSignUp)
            .then((userCredential) => {
                console.log(userCredential, "si pasoooooo")
                /****muestra el modal cuando se registra*****/
                const modal = document.querySelector('.modal-container');
                modal.style.display = 'inline';
                const message = document.getElementById('message');
                message.innerText = `Bienvenido ${nameUserNew}, hemos enviado un correo para verificar tu cuenta`;
            })

            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = document.querySelector('#error-message');
                errorMessage.style.display = 'flex';

                if (errorCode === 'auth/invalid-email') {
                    errorMessage.textContent = 'Debes completar todos los campos';

                }
                if (errorCode === 'auth/email-already-in-use') {
                    errorMessage.textContent = 'El correo ingresado ya se encuentra registrado';

                }
                if (errorCode === 'auth/weak-password') {
                    errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres';
                }
                if (errorCode === 'auth/internal-error') {
                    errorMessage.textContent = 'Debe ingresar una contraseña válida'
                }
                if (errorCode === 'auth/missing-email') {
                    errorMessage.textContent = 'Debes ingresar una cuenta de correo electrónico'
                }
            });
    });
    /************Boton que te lleva al Inicio de Sesión, si ya tienes cuenta**********/
    const btnLogin = sectionSignUp.querySelector('#linkLogIn');
    btnLogin.addEventListener('click', () => {
        window.location.hash = '#/';
    });

    /************Boton que acepta el modal y te lleva a iniciar sesión**********/
    const btnModal = sectionSignUp.querySelector('.modal-container');
    btnModal.addEventListener('click', () => {
        btnModal.style.display = 'none';
        window.location.hash = '#/';
    });

    return sectionSignUp;
};
