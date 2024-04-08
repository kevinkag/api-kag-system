import express, { Request, Response } from 'express'
import multer from 'multer';
import routes from './src/routes'
import imageRoutes from './src/routes/imageRoutes'
import path from 'path';
import qr from 'qrcode';
import moment from 'moment-timezone';

const app = express()

moment.tz.setDefault('America/Caracas'); // Cambia 'America/New_York' por la zona horaria que prefieras

const currentTime = moment();

// Imprime la hora actual en el formato deseado
console.log('Hora actual:', currentTime.format('YYYY-MM-DD HH:mm:ss'));

app.use('/', imageRoutes);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', routes);

export default app