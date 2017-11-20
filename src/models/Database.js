// @ flow

'use strict';

import Sequelize from 'sequelize';

const Database = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') ?
    new Sequelize(
        process.env.RDS_DB_NAME,
        process.env.RDS_USERNAME,
        process.env.RDS_PASSWORD, {
            host: process.env.RDS_HOSTNAME,
            port: process.env.PGPORT,
            dialect: 'postgres',
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
