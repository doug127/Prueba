import { Router } from "express";
import { login, register,logout, verifyToken } from "../controllers/admin.js";
import { loginSchema, registerSchema } from "../schema/admin.js";
import { schemaValidator } from "../middleware/validator.admin.js";
import { adminAuth } from "../middleware/jwt.admin.js";

const routes = Router();
routes.post('/', adminAuth,  (req, res ) => {
    console.log('estas en home')
})

routes.post('/login', schemaValidator(loginSchema), login)
routes.post('/register', schemaValidator(registerSchema), register)
routes.get('/logout', logout)
routes.get('/verify', verifyToken )
export default routes;