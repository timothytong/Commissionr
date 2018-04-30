'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _UserDb = require('./UserDb');

var _UserDb2 = _interopRequireDefault(_UserDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* define DB relationships
UserDb.belongsTo(AddressDb, {
    foreignKey: 'restaurant_address_id',
    targetKey: 'id',
});

UserDb.hasMany(OrderDb, {
    foreignKey: 'user_id',
    sourceKey: 'id',
});

UserDb.hasMany(ListDb, {
    foreignKey: 'user_id',
    sourceKey: 'id',
});

UserDb.hasMany(UserAddressDb, {
    foreignKey: 'user_id',
    sourceKey: 'id',
});

AddressDb.hasMany(UserAddressDb, {
    foreignKey: 'address_id',
    sourceKey: 'id',
});

AddressDb.hasMany(UserDb, {
    foreignKey: 'restaurant_address_id',
    sourceKey: 'id',
});

UserAddressDb.belongsTo(AddressDb, {
    foreignKey: 'address_id',
    targetKey: 'id',
});
*/

exports.default = {
    userDb: _UserDb2.default
};
//# sourceMappingURL=index.js.map
