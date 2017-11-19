// @flow

'use strict'

import type { $Application, NextFunction } from 'express';
import express from 'express';
import session from 'express-session'
import redis from 'redis';
import redisStore from 'connect-redis';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import UserRouter from './routes/UserRouter';
import { REGEN_LOCAL_DB } from './utils/Args';
import regenDb from './models/RegenDb';

export default class Api {
    // annotate with the express $Application type
    express: $Application;

    // create the express instance, attach app-level middleware, attach routers
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.generateDb();
    }

    // register middlewares
    middleware(): void {
        const store = redisStore(session);
        this.express.use(morgan('dev'));
        this.express.use(session({
            secret: 'abc',
            resave: false,
            store: new store({
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
            }),
            saveUninitialized: false,
            cookie: {
                maxAge: 7 * 24 * 60 * 60 * 1000, // 24h * 7 in milliseconds
            },
        }));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(cors());
    }

    // connect resource routers
    routes(): void {
        const userRouter: UserRouter = new UserRouter();

        // attach it to our express app
        this.express.use(userRouter.path, checkRedisConnect, userRouter.router);
    }

    // generate databases
    generateDb(): void {
        if (REGEN_LOCAL_DB || process.env.NODE_ENV === 'staging') {
            regenDb();
        }
    }
}

function checkRedisConnect(req: $Request, res: $Response, next: NextFunction) {
    if (!req.session) {
        return next(new Error('Redis not connected.'));
    }
    return next();
}
