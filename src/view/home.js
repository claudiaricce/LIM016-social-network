import { closeUserSession, addPost, realTimePosts} from '../firebase/firebaseFunciones.js'
import { user } from '../firebase/config.js'
import { templateFooter } from './footer.js'
import { templateHeader } from './header.js'

export const home = () => {

    const templateHome = `
    <section class="homePage">
    <div class="fotoPerfil">
    <h5 id="userName"></h5>
    <img src="" alt="foto" id="photoURL">
    </div>
    <div class="insertarPublicacion">
        <input id="insertarPublicacion" class="inputInsertarPublicacion" name="insertarPublicacion" type="text" placeholder="¿Que quieres compartir?"/><br>
        <button type="submit" class="btn-publicar" id="btn-publicar">
            Publicar
        </button>
    </div>
    </section>
    <section id="insertPost">
    </section>
    `
    function templatePost (photoUser, nameUser, datePost, postUser, idDoc, countLike) {
    const publish= homePage.querySelector('#insertPost');
    publish.innerHTML +=
    `<div class="container_post">
        <div class="header_post">
            <aside class="title_post">
                <h1 class="title">Publicado por: ${nameUser} </h1>
                <h4 class="date_hour">${datePost}</h4>
            </aside>
            <aside class="photo_perfil">
                <img src="${photoUser}" alt="foto">
            </aside>
        </div>
        <div class="content_post">
            <p>${postUser}</p>
        </div>
        <div class="iconos">
            <aside class="icons_iteration">
                <img src="" alt="like">
                <img src="" alt="coment">
            </aside>
            <aside class="icons_iteration">
                <img src="" alt="edit">
                <img src="" alt="delete">
            </aside>
        </div>
        <div class="coment">
            <input id="insert_coment" class="insert_coment" name="coment" type="text" placeholder="Añadir Comentario"/>
            <button type="submit" class="btn-comentar" id="btn-comentar">
                Publicar
            </button>
        </div>
    </div>`;
    return publish;
    };

    const homePage = document.createElement('article');
    homePage.classList.add('article-home');
    homePage.innerHTML = templateHeader + templateHome + templateFooter

    //const userName= homePage.querySelector('#userName');
   // const photoUsername = homePage.querySelector('#photoURL');
    //photoUsername.src = doc.data().photoGmail;

    //botón de publicar
    const publishButton = homePage.querySelector('#btn-publicar');
    publishButton.addEventListener('click', () => {
        const contentPost= document.querySelector('#insertarPublicacion');
        if(contentPost.value !== ''){
            addPost(user().displayName, contentPost.value, user().photoURL, user().uid);
        }
        contentPost.value = '';
    });
     
    // mostrar las publicaciones 
    const publish= homePage.querySelector('#insertPost');
    const photoUsername = homePage.querySelector('#photoURL');
    realTimePosts((querySnapshot) => {
        publish.innerHTML = '';
        querySnapshot.forEach((doc) => {
            photoUsername.src = doc.data().photoGmail;
            const fotoUser = doc.data().userPhotoPost;
            const nombreUser = doc.data().userWhoPublishes;
            const fechaPost = doc.data().publicationDate;
            const textoPost = doc.data().publishedText;
            const idUsuario = user().uid;
            const cuentaLike = doc.data().likesPost;
            const idDocumento = doc.id;
          // const btnHeart = (contadorLike.indexOf(idUsuario) !== -1) ? 'painted' : '';
        templatePost(fotoUser, nombreUser, fechaPost, textoPost, idDocumento, cuentaLike.length);
     });
    });
    console.log(realTimePosts)

    /************Cerrar sesión Usuario**************/
    const logOut = homePage.querySelector('#logOut');
    logOut.addEventListener('click', () => {
        closeUserSession()
            .then(() => {
                console.log('El usuario ha cerrado sesión');
                window.location.hash = '#/';
            })
            .catch((error) => {
                console.log(error, 'No se pudo cerrar la sesión');
            });
    });

    return homePage;
};
