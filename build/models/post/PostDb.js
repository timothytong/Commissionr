'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Database = require('../Database');

var _Database2 = _interopRequireDefault(_Database);

var _sequelize = require('sequelize');

var _UserDb = require('../user/UserDb');

var _UserDb2 = _interopRequireDefault(_UserDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var POSTS_TABLE = 'posts';

var PostDb = _Database2.default.define(POSTS_TABLE, {
    id: {
        type: _sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    last_seen: {
        type: _sequelize.DataTypes.DATE,
        allowNull: false
    },
    reward: {
        type: _sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: _sequelize.DataTypes.DOUBLE,
        allowNull: false
    },
    latitude: {
        type: _sequelize.DataTypes.DOUBLE,
        allowNull: false
    },
    city: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    found: {
        type: _sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    found_user_id: {
        type: _sequelize.DataTypes.INTEGER,
        allowNull: true,
        reference: {
            model: _UserDb2.default.userDb
        }
    },
    formatted_address: {
        type: _sequelize.DataTypes.STRING,
        allowNull: true
    },
    deleted: {
        type: _sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    submitter_user_id: {
        type: _sequelize.DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: _UserDb2.default.userDb
        }
    }
});

exports.default = PostDb;
//# sourceMappingURL=PostDb.js.map
