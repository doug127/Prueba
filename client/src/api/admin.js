import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})
//enviar al backend los datos del inicio de sesion
export const loginReq = admin => instance.post('/login', admin);

//cerrar sesion
export const logoutUser = () => instance.get('/logout');

//verificar si existe un token
export const verifyTokenReq = () => instance.get('/verify');