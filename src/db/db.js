import mongoose from "mongoose";

export const connect = async ()=>{
    try {
       await mongoose.connect('mongodb://localhost/demo');
       console.log('Conexion a la db exitosa')
    } catch (error) {
        console.log(error)
    }
}