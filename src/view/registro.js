import { createUser } from '../firebase/firebaseFunciones.js'

const elementH1 = (text) => { //esta funcion se puede usar para todas las etiquetas h1
    const main = document.getElementById('app')
    const div = document.createElement('div')
    const h1 = document.createElement('h1');
    h1.setAttribute('class', 'SignUp')
    h1.innerHTML = text;
    div.appendChild(h1);
    main.appendChild(div);
}
elementH1('SignUp');

const elementInput = () => {
    const input = document.getElementById('app')
    const sectionSignUp = document.createElement('section');
    const divSignUp = document.createElement('div')
    sectionSignUp.classList.add('sectionSignUp'); //la clase para la section 
    divSignUp.classList.add('divSignUp') // clase para el nombre 
    divSignUp.innerHTML = `
    <label for="name">Nombre</label>
    <input id="name" class="form" name="nombre" type="text" placeholder="Claudia " required/>
    <label for="apellido">Apellido</label>
    <input id="apellido" class="form" name="apellido" type="text" placeholder="Ricce " required/> <br>
    <label for="email">Correo Electrónico</label>
    <input id="email" class="form" name="email" type="email" placeholder="claudia.ricce@gmail.com " required/>
    <label for="password">Contraseña</label>
    <input id="password" class="form" name="contraseña" type="text" placeholder="********** " required/>
    <h5 class="textPrivacidad">Al hacer clic en registrarte, aceptas nuestras Condiciones, Política de datos y la política de cookies. </h5>
    <button type="submit" class="btn" id="btn">Registrate</button>`
    sectionSignUp.appendChild(divSignUp);
    input.appendChild(sectionSignUp);

}
elementInput();

const botonSignUp = () => { //este es el evento para el boton de registrate
    const boton_SignUp = document.querySelector('#btn');
    boton_SignUp.addEventListener('click', () => {
        //console.log("diste un click")

        //const nameSignUp = document.querySelector('#name').value;
        //const lastNameSignUp = document.querySelector('#apellido').value;
        const emailSignUp = document.querySelector('#email').value;
        const passwordSignUp = document.querySelector('#password').value;

        //console.log(nombreDelRegistro, apellidoDelRegistro, emailDelRegistro, contraseñaDelRegistro, fechaNacDelRegistro);

        createUser(emailSignUp, passwordSignUp)
            .then((userCredential) => {
                console.log(userCredential, "si pasoooooo")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });

    });
}
botonSignUp();
