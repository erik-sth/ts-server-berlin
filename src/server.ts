import express, { Express } from 'express';
import { configureCors } from './startup/cors';
import base from './routes/base';
import project from './routes/project';
import connectToDatabase from './startup/db';
import addRateLimiter from './startup/limitRate';
import * as dotenv from 'dotenv';
import logger from './utils/logger';
import { testingConfig } from './startup/testing';
dotenv.config();

const app: Express = express();

// startup
configureCors(app);
addRateLimiter(app);
connectToDatabase();
testingConfig();

app.use(express.json());
app.use('/', base);
app.use('/project', project);

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 0;
const server = app.listen(port, '0.0.0.0', () => {
    logger.info('Server started on port: ' + port);
});
export { server };
