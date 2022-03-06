/* eslint-disable spaced-comment */
/* eslint-disable indent */

// Funciones de Firebase
import {
    createUserWithEmailAndPassword,
<<<<<<< HEAD
    //signInWithEmailAndPassword,
    //sendEmailVerification,
} from '../src/firebase/__mocks__/mockfirebase';
=======
    signInWithEmailAndPassword,
    sendEmailVerification,
    addDoc,
    collection,
} from '../src/firebase/config.js';
>>>>>>> b2b7bc7c55eec097a7898b2af4b38cc9357c75bb

//Funciones que vamos a testear
import {
    createUser,
    loginApp,
    verificateEmail,
    addUser,
} from '../src/firebase/firebaseFunciones.js';

//Mock de las funciones de firebase
jest.mock('../src/firebase/config.js'); //Se llama al archivo config de mi carpeta mocks

//Test del Registro de un usuario
describe('probar la función createUser', () => {
    it('Deberia ser una funcion', () => {
        expect(typeof createUser).toBe('function');
    });
<<<<<<< HEAD
    it('Debería poder registrar a un usuario', () => createUser('marita@gmail.com', '12355687').then(() => {
    expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('marita@gmail.com');
    expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('12355687');
  }));
=======
    it('Debería poder registrar un usuario nuevo con email y contraseña', () => createUser('hola@gmail.com', '12345678').then(() => {
        expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('hola@gmail.com');
        expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('12345678');
    }));
});

//Test de Inicio de sesión con correo y contraseña
describe('probar la función loginApp', () => {
    it('Deberia ser una funcion', () => {
        expect(typeof loginApp).toBe('function');
    });
    it('Debería permitir que el usuario inicie sesión con email y contraseña', () => {
        loginApp('hola@gmail.com', '12345678').then(() => {
            expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('hola@gmail.com');
            expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('12345678');
        });
    });
});

//Test de email que se envia al correo para validar la cuenta cuando se registra
describe(' probar la función emailVerification', () => {
    it('debería ser una función', () => {
        expect(typeof verificateEmail).toBe('function');
    });
    it('Deberia recibir un solo link para validar la cuenta de registro', () => verificateEmail()
        .then(() => {
            expect(sendEmailVerification.mock.calls).toHaveLength(1);
        }));
});

// Test de la colección cuando un usuario se registra
describe('Probando la función addUser', () => {
    it('Deberia ser una funcion', () => {
        expect(typeof addUser).toBe('function');
    });
    it('Deberia crear los datos de la coleccion user',
        () => addUser('Daniela Magdaleno', '12345678', 'N6jHTmbGhOfEKE7SNeBbSISW2963')
            .then(async () => {
                const mockColletion = await
                    addDoc(collection.mock.results[0].value,
                        addDoc.mock.calls[0][1]);
                const datosUsuario = {
                    user: {
                        nameUser: 'Daniela Magdaleno',
                        emailUser: '12345678',
                        IdUserActive: 'N6jHTmbGhOfEKE7SNeBbSISW2963',
                    },
                };
                expect(mockColletion).toBe(datosUsuario);
            }));
>>>>>>> b2b7bc7c55eec097a7898b2af4b38cc9357c75bb
});
