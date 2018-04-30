'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Database = require('../Database');

var _Database2 = _interopRequireDefault(_Database);

var _sequelize = require('sequelize');

var _PostDb = require('../post/PostDb');

var _PostDb2 = _interopRequireDefault(_PostDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ATTRIBUTE_TABLE = 'attributes';

var AttributeDb = _Database2.default.define(ATTRIBUTE_TABLE, {
    id: {
        type: _sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    key: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
    },
    post_id: {
        type: _sequelize.DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: _PostDb2.default.postDb
        }
    }
});

exports.default = AttributeDb;
//# sourceMappingURL=AttributeDb.js.map
