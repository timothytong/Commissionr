// @ flow

'use strict';

import Sequelize from 'sequelize';

console.log("Process env is " + process.env.NODE_ENV);

const match = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/) : '';

const Database = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') ?
    new Sequelize(
        match[5],
        match[1],
        match[2], {
            host: match[3],
            port: match[4],
            dialect: 'postgres',
            protocol: 'postgres',
            pool: {
                max: 10,
                min: 0,
                idle: 30000
            },
            define: {
                timestamps: false,
                freezeTableName: true,
            },
        },
    ) : new Sequelize(
        process.env.PGUSER,
        process.env.PGDATABASE,
        process.env.PGPASSWORD , {
            host: 'localhost',
            port: process.env.PGPORT,
            dialect: 'postgres',
            pool: {
                max: 10,
                min: 0,
                idle: 30000
            },
            define: {
                timestamps: false,
            },
        },
    );

export default Database;
