import jwt  from "jsonwebtoken";
import { TOKEN_SECRECT } from "../config.js";

//creamos un token con el id del usuario 
export function createAccessToken (payload){
   return new Promise((resolve, reject) => {
    jwt.sign(
        payload, TOKEN_SECRECT, {expiresIn: '1d'},
            (err, token)=>{
                if(err) reject(err);
                resolve(token);
            })
   })
}

