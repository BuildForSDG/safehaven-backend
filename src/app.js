import express from 'express';
import cors from 'cors';
import route from './routes';

const app = express();
app.use(cors());

route(app);
console.log(app.get('env'));

export default app;
