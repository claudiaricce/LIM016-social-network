/* eslint-disable spaced-comment */
/* eslint-disable indent */

// Funciones de Firebase
import {
    //createUserWithEmailAndPassword,
    //signInWithEmailAndPassword,
    //sendEmailVerification,
} from '../src/firebase/config.js';

//Funciones que vamos a testear
import {
    createUser,
    //loginApp,
    //verificateEmail,
} from '../src/firebase/firebaseFunciones.js';

//Mock de las funciones de firebase
jest.mock('../src/firebase/config.js');

//Test del Registro de un usuario
describe('probar la función createUser', () => {
    it('Deberia ser una funcion', () => {
        expect(typeof createUser).toBe('function');
    });
});
