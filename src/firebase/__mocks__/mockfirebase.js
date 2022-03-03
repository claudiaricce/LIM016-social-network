/* eslint-disable spaced-comment */
/* eslint-disable indent */

//auth
export const auth = jest.fn();

//crear un usuario con email y password
export const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve({}));

//envio de un email de verificación
export const sendEmailVerification = jest.fn(() => Promise.resolve({}));
