
const elementH1 = (texto) => { //esta funcion se puede usar para todas las etiquetas h1
    const main = document.getElementById('app')
    const div = document.createElement('div')
    const h1 = document.createElement('h1');
    h1.setAttribute('class', 'Registrate')
    h1.innerHTML = texto;
    div.appendChild(h1);
    main.appendChild(div);
}
elementH1('Registrate');

const elementInput = () => {
    const input = document.getElementById('app')
    const sectionNombre = document.createElement('section');
    const divNombre = document.createElement('div')
    sectionNombre.classList.add('sectionNombre'); //la clase para la section 
    divNombre.classList.add('divNombre') // clase para el nombre 
    divNombre.innerHTML = `
    <input id="name" class="form" name="nombre" type="text" placeholder="Claudia " required/>
    <input id="apellido" class="form" name="apellido" type="text" placeholder="Ricce " required/>
    <input id="fechaNac" class="form" name="fechaNac" type="date" placeholder="09/10/2010 "/>
    <input id="email" class="form" name="email" type="email" placeholder="claudia.ricce@gmail.com " required/>
    <input id="contraseña" class="form" name="contraseña" type="password" placeholder="********** " required/>
    <h5 class="textPrivacidad">Al hacer clic en registrarte, aceptas nuestras Condiciones, Política de datos y la política de cookies. </h5>
    <button type="button" class="btn">Registrate</button>`
    sectionNombre.appendChild(divNombre);
    input.appendChild(sectionNombre);
}
console.log(elementInput());