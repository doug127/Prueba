import express from 'express';
import { connect } from './db/db.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import admin from './routes/admin.routes.js';
const app = express();

//morgan para ver las respuestas del navegador mediante la terminal
app.use(morgan('dev'));
app.use(express.json());
//cookie-parser para convertir los cookie en un objeto json
app.use(cookieParser());
//cors para leer entre url
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/api', admin);

connect();

app.listen(3000, ()=>{
    console.log('Conectado desde el puerto 3000');
})

export default app;