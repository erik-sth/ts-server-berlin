import express, { Express } from 'express';
import { configureCors } from './startup/cors';
import bodyParser from 'body-parser';

import isOnline from './routes/isOnline';
import project from './routes/project';
import connectToDatabase from './startup/db';

const app: Express = express();

// startup
configureCors(app);
connectToDatabase();

app.use(bodyParser.json());
app.use('/', isOnline);
app.use('/project', project);

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const server = app.listen(port, '0.0.0.0');

export { server };
