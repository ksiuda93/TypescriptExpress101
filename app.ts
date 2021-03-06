import express from 'express';
import * as http from 'http';


import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { CommonRoutesConfig } from './common/common.routes.config';
import { UserRoutes } from './users/user.routes.config';
import debug from 'debug';
import dotenv from 'dotenv';

const dotenvResult = dotenv.config();
if (dotenvResult.error){
    throw dotenvResult.error;
}
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new UserRoutes(app));

const runningMessage: string = `Server is running at http://localhost:${port}`;

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName}`);
    });
    console.log(runningMessage);
})