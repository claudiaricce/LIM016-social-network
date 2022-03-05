/* eslint-disable spaced-comment */
/* eslint-disable indent */

// Funciones de Firebase
import {
    createUserWithEmailAndPassword,
    //signInWithEmailAndPassword,
    //sendEmailVerification,
} from '../src/firebase/__mocks__/mockfirebase';

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
    it('Debería poder registrar a un usuario', () => createUser('marita@gmail.com', '12355687').then(() => {
    expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('marita@gmail.com');
    expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('12355687');
  }));
});
