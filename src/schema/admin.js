import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: 'nombre es necesario'
    }),
    dni: z.string({
        required_error: 'dni es necesario'
    }),
    password: z.string({
        required_error: 'contraseña es necesaria'
    }).min(4, {
        message: 'la contraseña debe ser de minimo 4 caracteres'
    })
})


export const loginSchema = z.object({
    dni: z.string({
        required_error: 'dni es necesario' 
    }),
    password: z.string({ required_error: 'contraseña es necesaria'
    }).min(4, { message: 'la contraseña debe ser de minimo 4 caracteres' })
})