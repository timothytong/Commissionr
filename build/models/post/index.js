'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _PostDb = require('./PostDb');

var _PostDb2 = _interopRequireDefault(_PostDb);

var _UserDb = require('../user/UserDb');

var _UserDb2 = _interopRequireDefault(_UserDb);

var _AttributeDb = require('../attribute/AttributeDb');

var _AttributeDb2 = _interopRequireDefault(_AttributeDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define DB relationships
_PostDb2.default.belongsTo(_UserDb2.default, {
    foreignKey: 'submitter_user_id',
    targetKey: 'id',
    as: 'submitter'
});
_PostDb2.default.belongsTo(_UserDb2.default, {
    foreignKey: 'found_user_id',
    targetKey: 'id',
    as: 'finder'
});
_PostDb2.default.hasMany(_AttributeDb2.default, {
    foreignKey: 'post_id',
    sourceKey: 'id',
    as: 'additional_attributes'
});

exports.default = {
    postDb: _PostDb2.default
};
//# sourceMappingURL=index.js.map
