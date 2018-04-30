'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Database = require('../Database');

var _Database2 = _interopRequireDefault(_Database);

var _sequelize = require('sequelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USERS_TABLE = 'users';

var UserDb = _Database2.default.define(USERS_TABLE, {
    id: {
        type: _sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_name: {
        type: _sequelize.DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: _sequelize.DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: _sequelize.DataTypes.TEXT,
        allowNull: false
    },
    active: {
        type: _sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

exports.default = UserDb;
//# sourceMappingURL=UserDb.js.map
