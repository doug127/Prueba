import jwt from "jsonwebtoken";
import {TOKEN_SECRECT} from '../config.js'

//validamos que el usuario tenga la sesiona ctiva mediante el token
export const adminAuth = (req, res, next) =>{
    const {token} = req.cookies;
    //validamos que exista un token
    if(!token) return res.status(401).json({message: 'es necesario iniciar sesion'});

    //verificamos que el token sea valido
    jwt.verify(token, TOKEN_SECRECT, (err, user)=>{
        if(err) return res.status(404).json({message: 'token invalido'});

        //enviamos la informacion del token mediante el req
        req.user = user;
        next();
    })
} 