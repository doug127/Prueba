import User from '../models/admin.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';
import  Jwt  from 'jsonwebtoken';
import { TOKEN_SECRECT } from '../config.js';

//login
export const login = async (req, res) => {
    const { dni, password } = req.body;

    try {
        // Validar que el DNI contenga solo dígitos
        if (!/^\d+$/.test(dni)) {
            return res.status(400).json({ message: 'El DNI debe contener solo números' });
        }

        // Convertir el DNI a un número entero
        const dniInt = parseInt(dni, 10);

        // Consultamos si el usuario existe en la base de datos
        const findUser = await User.findOne({ dni: dniInt });
        if (!findUser) return res.status(404).json({ message: 'DNI incorrecto' });

        // Comparamos las contraseñas
        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) return res.status(404).json({ message: 'Contraseña incorrecta' });

        // Creamos un token desde el archivo jwt.js
        const token = await createAccessToken({ id: findUser._id });

        // Guardamos el token en una cookie
        res.cookie('token', token);
        res.json({ message: 'Iniciaste sesión' });

    } catch (error) {
        console.log('Error al iniciar sesión en user.controller.js');
        console.log(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//register
export const register = async (req, res) => {
    const { username, dni, password } = req.body;

    try {
        // Validar el nombre de usuario antes de consultar la base de datos
        if (typeof username !== 'string' || !/^[a-zA-Z]+$/.test(username)) {
            return res.status(401).json(['el nombre de usuario no debe tener numeros ni caracteres especiales']);
        }

        const foundOne = await User.findOne({ dni });
        if (foundOne) {
            return res.status(409).json(['el dni ya esta en uso']);
        }

        // Encriptamos la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Creamos un objeto del usuario
        const newUser = new User({ username, dni, password: passwordHash });

        // Guardamos el objeto en la base de datos de MongoDB
        const userSave = await newUser.save();

        // Creamos un token desde el archivo jwt.js
        const token = await createAccessToken({ id: userSave._id });

        // Guardamos el token en una cookie
        res.cookie('token', token);
        res.json({ message: 'token creado con éxito' });
    } catch (error) {
        console.error('Error al registrar al usuario en user.controller.js:', error);
        return res.status(500).json(['Error interno del servidor']);
    }
};

//cerrar sesion
export const logout = (req, res)=>{
    res.cookie('token', '', {expires: new Date(0),});
    return res.status(200).json({message: 'cerraste sesión'});
}

//verificar el token que se recibe del frotend
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    
    if (!token) return res.status(401).json({ message: 'Token no autorizado desde user.controller' });

    Jwt.verify(token, TOKEN_SECRECT, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Token no autorizado 2 desde user.controller' });

        const userFind = await User.findById(user.id);
        if (!userFind) return res.status(401).json({ message: 'usuario no encontrado desde user.controller' });

        return res.json({ id: userFind._id ,username: userFind.username, email: userFind.email });
    });
};
