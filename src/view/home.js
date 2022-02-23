import {
    closeUserSession,
    addPost,
    realTimePosts,
    likes,
    removeLikes,
    getDataUser,
    addComments
} from '../firebase/firebaseFunciones.js'
import { user } from '../firebase/config.js'
import { templateFooter } from './footer.js'
import { templateHeader } from './header.js'

export const home = () => {

    const templateHome = `
    <section class="homePage">
    <div class="fotoPerfil">
    <img src="" alt="foto" id="photoURL">
    <h5 class="userName" id="userName"></h5>
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
    function templatePost(photoUser, nameUser, datePost, postUser, idDoc, cuentaLike) {
        const publish = homePage.querySelector('#insertPost');
        publish.innerHTML +=
            `<div class="container_post">
        <div class="header_post">
            <aside class="title_post">
                <h1 class="title">Publicado por: ${nameUser} </h1>
                <h4 class="date_hour">${datePost}</h4>
            </aside>
            <aside class="photo_perfil">
                <img class="photo_public" src="${photoUser}" alt="foto">
            </aside>
        </div>
        <div class="content_post">
            <p>${postUser}</p>
        </div>
        <div class="iconos">
            <aside class="icons_iteration">
                <img id='btn_give_like' class='mark_like' src="./img/like.png" alt="like">
                <p class="counterlike">${cuentaLike}</p>
                <img class='icono-coment' id='icono-coment' src="./img/comentar.png" alt="coment">
            </aside>
            <aside class="icons_iteration">
                <img src="" alt="edit">
                <img src="" alt="delete">
            </aside>
        </div>
        <div class="coment">
            <p id='name_user_coment' class='name_user_coment'></p>
            <p class='insert_coment_user'></p>
            <input id="insert_coment" class="insert_coment" name="coment" type="text" placeholder="Añadir un comentario..."/>
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

    //botón de publicar
    const publishButton = homePage.querySelector('#btn-publicar');
    publishButton.addEventListener('click', () => {
        const contentPost = document.querySelector('#insertarPublicacion');
        if (contentPost.value !== '') {
            addPost(user().displayName, contentPost.value, user().photoURL, user().uid);
        }
        contentPost.value = '';
    });

    // mostrar las publicaciones 
    const publish = homePage.querySelector('#insertPost');
    realTimePosts((querySnapshot) => {
        publish.innerHTML = '';
        querySnapshot.forEach((doc) => {
            //console.log(doc.data());
            const fotoUser = doc.data().userPhotoPost;
            const nombreUser = doc.data().userWhoPublishes;
            const fechaPost = doc.data().publicationDate;
            const textoPost = doc.data().publishedText;
            const idUsuario = user().uid;
            const cuentaLike = doc.data().likesPost;
            const idDocumento = doc.id;
            const btnHeart = (cuentaLike.indexOf(idUsuario) !== -1) ? 'paint' : '';
            templatePost(fotoUser, nombreUser, fechaPost, textoPost, idDocumento, cuentaLike.length, btnHeart);

            /************likes a las publicaciones **************/
            const btn_give_like = homePage.querySelectorAll('.mark_like');
            //console.log(btn_give_like); //Selecciona todos los likes de todas las publicaciones, se crea un Nodelist [] OJO esta en 0
            btn_give_like.forEach((like) => {
                like.addEventListener('click', (e) => {
                    console.log('diste click')
                    const idPost = e.target.dataset.id;
                    if (e.target.classList.contains('paint')) {
                        removeLikes(idPost, idUsuario).FieldValue;
                        e.target.classList.remove('paint')
                        console.log("se quito el like");
                    } else {
                        likes(idPost, idUsuario).FieldValue;
                        e.target.classList.add('paint')
                        console.log("se dio like");
                    }

                });
            });

        });
        //console.log(realTimePosts)

        /************Insertar nombre de usuario y Foto**************/
        const loginUsername = homePage.querySelector('#userName');
        const photoUsername = homePage.querySelector('#photoURL');
        getDataUser()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (user().uid === doc.data().IdUserActive) {
                        loginUsername.textContent = doc.data().nameUser;
                        photoUsername.src = doc.data().photoGmail;
                    }
                });
            });

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


    })
    return homePage;
}

