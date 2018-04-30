// @ flow

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("Process env is " + process.env.NODE_ENV);

var match = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/) : '';

var Database = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? new _sequelize2.default(match[5], match[1], match[2], {
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
        freezeTableName: true
    }
}) : new _sequelize2.default(process.env.PGUSER, process.env.PGDATABASE, process.env.PGPASSWORD, {
    host: 'localhost',
    port: process.env.PGPORT,
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        idle: 30000
    },
    define: {
        timestamps: false
    }
});

exports.default = Database;
//# sourceMappingURL=Database.js.map
