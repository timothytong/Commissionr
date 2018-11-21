'use strict';

import Commission from './Commission';
import CommissionForm from '../commissionForm/CommissionForm';
import CommissionStatus from '../commissionStatus/CommissionStatus';
import CommissionQueue from '../commissionQueue/CommissionQueue';
import Product from '../product/Product';
import User from '../user/User';

// define DB relationships
Commission.belongsTo(CommissionForm, {
    foreignKey: {
        name: 'comm_form_id',
        allowNull: false,
    },
    targetKey: 'id',
});

Commission.belongsTo(CommissionQueue, {
    foreignKey: {
        name: 'commission_queue_id',
        allowNull: false,
    },
    targetKey: 'id',
});

Commission.hasMany(CommissionStatus, {
    foreignKey: {
        name: 'commission_id',
        allowNull: false,
    },
    targetKey: 'id',
});

Commission.belongsTo(Product, {
    foreignKey: {
        name: 'product_id',
        allowNull: false,
    },
    targetKey: 'id',
});

Commission.belongsTo(User, {
    foreignKey: {
        name: 'merchant_id',
        allowNull: false,
    },
    targetKey: 'id',
});

Commission.belongsTo(User, {
    foreignKey: {
        name: 'commissioner_id',
        allowNull: false,
    },
    targetKey: 'id',
});

export default Commission;
