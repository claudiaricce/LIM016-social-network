import { templateFooter } from './footer.js'
import { templateHeader } from './header.js'

export const profile = () => {
    const templateprofile =
        `
   <a href="#/profile">
   Hola este es tu perfil
   </a>
   `
    const profilePage = document.createElement('div');
    profilePage.classList.add('article-home');
    profilePage.innerHTML = templateHeader + templateprofile + templateFooter

    return profilePage
}
