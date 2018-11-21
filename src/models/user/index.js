'use strict';

import CommissionForm from '../commissionForm/CommissionForm';
import Commission from '../commission/Commission';
import User from './User';

// define DB relationships
User.hasMany(CommissionForm, {
    foreignKey: 'comm_form_id',
    targetKey: 'id',
});

/*
User.belongsToMany(User, {
    through: Commission,
    as: 'merchant',
    constraints: false,
    foreignKey: {
        allowNull: false,
        name: 'merchant_id',
    },
    targetKey: 'id',
    unique: false,
});

User.belongsToMany(User, {
    through: Commission,
    as: 'commissioner',
    constraints: false,
    foreignKey: {
        allowNull: false,
        name: 'commissioner_id',
    },
    targetKey: 'id',
});
*/

export default User;
