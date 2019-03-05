// @flow

'use strict'

import type { $Application, NextFunction } from 'express';
import { REGEN_LOCAL_DB } from './utils/Args';

import express from 'express';
import session from 'express-session'
import redis from 'redis';
import redisStore from 'connect-redis';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import CommissionRouter from './routes/CommissionRouter';
import UserRouter from './routes/UserRouter';
import PostRouter from './routes/PostRouter';
import regenDb from './models/RegenDb';
import firebase from 'firebase';


export default class Api {
    // annotate with the express $Application type
    express: $Application;

    // create the express instance, attach app-level middleware, attach routers
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.generateDb();
        this.startFirebase();
    }

    // register middlewares
    middleware(): void {
        const store = redisStore(session);
        const redisStoreOptions = process.env.NODE_ENV === 'production' ?
            new store({url: process.env.REDIS_URL})
            : new store({
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
            })
        this.express.use(morgan('dev'));
        this.express.use(session({
            secret: 'abc',
            resave: false,
            store: redisStoreOptions,
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
        const commissionRouter: CommissionRouter = new CommissionRouter();

        // attach it to our express app
        this.express.use(userRouter.path, checkRedisConnect, userRouter.router);
        this.express.use(commissionRouter.path, checkRedisConnect, commissionRouter.router);

        this.express.use(express.static(path.join(__dirname, 'static')));
        this.express.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, 'static', 'index.html')));
    }

    // generate databases
    generateDb(): void {
        if (REGEN_LOCAL_DB || process.env.NODE_ENV === 'staging') {
            regenDb();
        }
    }

    // boot up firebase
    startFirebase(): void {
        const config = {
            apiKey: "AIzaSyAWVLf122ZpbGYO91UIv3wcUSn9OHJhMiY",
            authDomain: "commissionr-6d20d.firebaseapp.com",
            databaseURL: "https://commissionr-6d20d.firebaseio.com",
            projectId: "commissionr-6d20d",
            storageBucket: "commissionr-6d20d.appspot.com",
            messagingSenderId: "348933720333"
        };

        firebase.initializeApp(config);
    }
}

function checkRedisConnect(req, res, next) {
    if (!req.session) {
        return next(new Error('Redis not connected.'));
    }
    return next();
}
