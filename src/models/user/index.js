'use strict';

import UserDb from './UserDb';

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

export default {
    userDb: UserDb,
}
