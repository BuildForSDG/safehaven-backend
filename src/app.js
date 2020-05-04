import express from 'express';
import multer from 'multer';
import cors from 'cors';
import route from './routes';

const upload = multer();

const app = express();
app.use(cors());
app.use(upload.single('file'));

route(app);
console.log(app.get('env'));

export default app;
