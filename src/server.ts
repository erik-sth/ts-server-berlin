import express, { Express } from 'express';
import { configureCors } from './startup/cors';
import isOnline from './routes/isOnline';
import project from './routes/project';
import connectToDatabase from './startup/db';
import config from './startup/config';
import addRateLimiter from './startup/limitRate';
import * as dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

// startup
config();
configureCors(app);
connectToDatabase();
addRateLimiter(app);

app.use(express.json());
app.use('/', isOnline);
app.use('/project', project);

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const server = app.listen(port, '0.0.0.0');

export { server };
