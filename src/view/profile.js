import { closeUserSession, getDataUser, editProfile, getEditProfile } from "../firebase/firebaseFunciones.js"
import { user } from "../firebase/config.js"
import { templateFooter } from './footer.js'
import { templateHeader } from './header.js'

//import { storage, ref, uploadBytes } from '../firebase/config.js'


export const profile = () => {
    const templateprofile =
        `<div class="userProfile">
        <form class="form-imgProfile"
        <label class="btn-file">
        <!--input type="file" name="uploadFile" id="uploadFile"-->
        <img class="perfil" src="">
        <!--button id="btn-savePhoto" class="btn_register">Agregar</button--> 
        </label>
        <a href="#/profile">
        </a>
        </form>
        <div class="descriptionPerfil">
            <p class="nameRegister">Nombre Usuario:</p>
            <p class="emailRegister">email:</p>
            <p id="insert_description" class="description">➤ Descripción</p>
        </div>
        </div>
        <button type="submit" class="btn-editProfile" id="btn-editProfile">
            Editar perfil
        </button>
        <h1 class="title-profile">
            Mis publicaciones
        </h1>
        
        <!--Este es el modal para editar Perfil-->
    <div class="modal-containerEdit" style="display: none">
        <div class="modal-editProfile">
            <input id="description" class="form-description" name="description" type="text" placeholder="Describete brevemente..."/> 
            <button id="btn-saveChanges" class="btn_register">Guardar Cambios</button>
        </div>
    </div>`

    const profilePage = document.createElement('div');
    profilePage.classList.add('article-home');
    profilePage.innerHTML = templateHeader + templateprofile + templateFooter

    /************Insertar nombre de usuario**************/
    const loginUsername = profilePage.querySelector('.nameRegister');
    const photoUsername = profilePage.querySelector('.perfil');
    const emailUsername = profilePage.querySelector('.emailRegister');
    getDataUser()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (user().uid === doc.data().IdUserActive) {
                loginUsername.textContent = doc.data().nameUser;
                emailUsername.textContent = doc.data().emailUser;
                photoUsername.src = doc.data().photoGmail;
                };
            });
        });

    /************Insertar descripcion en el perfil**************/
    const descriptionProfile = profilePage.querySelector('#insert_description');
    getEditProfile()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                descriptionProfile.textContent = doc.data().publishedText;
            });
        });

    /************Boton que abre modal para editar perfil**************/
    const boton_editProfile = profilePage.querySelector('#btn-editProfile');
    boton_editProfile.addEventListener('click', () => {
        const modal_editProfile = document.querySelector('.modal-containerEdit');
        modal_editProfile.style.display = 'inline';
    })

    /************Evento del teclado para llenar Input**********/
    const event_fill_input = profilePage.querySelector('.modal-containerEdit');
    event_fill_input.addEventListener('keyup', () => {
        const input_description = profilePage.querySelector('#description'); //este es input del formulario 
        const obtenerValue = input_description.value; //aqui selecciono el valor del input 
        const insertDescription = profilePage.querySelector('#insert_description'); // este es el espacio donde imprimire en el perfil 
        insertDescription.innerHTML = obtenerValue; //aqui inserto en el perfil 
    })

    /************Boton que guarda los cambios y vuelve al perfil**********/
    const boton_saveChanges = profilePage.querySelector('#btn-saveChanges');
    boton_saveChanges.addEventListener('click', () => {
        const modal_changes_Saved = document.querySelector('.modal-containerEdit');
        modal_changes_Saved.style.display = 'none';

        const contentDescription = document.querySelector('#description').value;
        console.log(contentDescription);

        editProfile(contentDescription, user().displayName, user().uid)
            .then(() => {
                console.log('todo bien');
            })
            .catch((error) => {

                console.log(error, 'todo mal');
            });

    })

    /************Cerrar sesión Usuario**************/
    const logOutProfile = profilePage.querySelector('#logOut');
    logOutProfile.addEventListener('click', () => {
        closeUserSession()
            .then(() => {
                console.log('El usuario ha cerrado sesión');
                window.location.hash = '#/';
            })
            .catch((error) => {
                console.log(error, 'No se pudo cerrar la sesión');
            });
    });

    /************Cargar imagenes**************/
    /* let fichero;
    const inicializar = () => {
        fichero = profilePage.querySelector('#uploadFile');
        //console.log(fichero);
        fichero.addEventListener('change', uploadFileToFirebase, false)
    }
    
    const uploadFileToFirebase = () => {
        console.log("subir imagen a firebase")
        // Create a child reference
        const imagesRef = ref(storage, 'imagenesGlowApp');
        console.log(imagesRef)
    
        //const ref = firebase.storage().ref();
    
        const imageToUpload = fichero.files[0]; //esta es la imagen que quiero subir 
        console.log(imageToUpload);
        //obtener el nombre de la foto 
        const name = new Date() + ' ' + imageToUpload.name;
        console.log(name);
        //creo un objeto que obtendra el tipo de imagen la
        const metadata = {
            contentType: imageToUpload.type
        }
        console.log(metadata);
    
        uploadBytes(storageRef, imageToUpload)
            .then((snapshot) => {
                console.log('Has subido un archivo!');
            });
        ///creamos una promesa  
    
    
    
    }
    inicializar()*/
    return profilePage
}


