import { closeUserSession, addPost, realTimePosts, getDataUser, deletePost, likes, removeLikes } from '../firebase/firebaseFunciones.js'
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
    function templatePost(photoUser, nameUser, datePost, postUser, idDoc, lengthLike) {
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
                <img id='btn_give_like-${idDoc}' class='mark_like' data-like="${idDoc}" src="./img/like.png" alt="like">
                <p class="counterlike">${lengthLike}</p>
                <img src="" alt="coment">
            </aside>
            <aside class="icons_iteration">
                <img data-edit="${idDoc}"  class="editBtn" src="./img/editar.png" alt="edit">
                <img data-post="${idDoc}"  class="deleteBtn" src="./img/borrar.png" alt="delete" >
            </aside>
        </div>
        <div class="coment">
            <p></p>
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
            const identUsuario= doc.data().userIdent;
            const cuentaLike = doc.data().likesPost;
            const lengthLike= cuentaLike.length;
            const idDocumento = doc.id;
            templatePost(fotoUser, nombreUser, fechaPost, textoPost, idDocumento, identUsuario, lengthLike);
    
         /************likes a las publicaciones **************/
         const btn_give_like = homePage.querySelectorAll('.mark_like');
         //console.log(btn_give_like); //Selecciona todos los likes de todas las publicaciones, se crea un Nodelist [] OJO esta en 0
         btn_give_like.forEach((like) => {
             like.addEventListener('click', (e) => {
                 console.log('diste click')
                 const idPost = e.target.dataset.like;
                 if (!e.target.classList.contains('paint')) {
                     likes(idPost, idUsuario).fieldValue;
                 } else {
                     removeLikes(idPost, idUsuario).fieldValue;
                 }
             });
         });

        //mostrar botones de edicion y eliminar
        const edit = homePage.querySelectorAll('.editBtn');
        const deleteBtn = homePage.querySelectorAll('.deleteBtn');
        
        edit.forEach((img) => {
            if ( idUsuario === identUsuario) {
                img.style.display = "inline";
            }
        }); 
        deleteBtn.forEach((img) => {
            if ( idUsuario === identUsuario) {
                img.style.display = "inline";
            }
        }); 

        //eliminar posts
            const btnDelete = homePage.querySelectorAll('.deleteBtn');
            btnDelete.forEach((btn) => {
             btn.addEventListener('click', (e) => {
              const confirmar = window.confirm('¿Estás seguro de que deseas borrar este post?');
              if (confirmar) {
              deletePost(e.target.dataset.post);
              //console.log(e.target.dataset.post)
              }
             });
            });

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

    return homePage;
}