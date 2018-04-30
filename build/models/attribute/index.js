'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _PostDb = require('../post/PostDb');

var _PostDb2 = _interopRequireDefault(_PostDb);

var _AttributeDb = require('./AttributeDb');

var _AttributeDb2 = _interopRequireDefault(_AttributeDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define DB relationships
_AttributeDb2.default.belongsTo(_PostDb2.default, {
    foreignKey: 'post_id',
    targetKey: 'id',
    as: 'post'
});

exports.default = {
    attributeDb: _AttributeDb2.default
};
//# sourceMappingURL=index.js.map
