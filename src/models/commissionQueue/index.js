'use strict';

import Commission from '../commission/Commission';
import User from '../user/User';
import CommissionQueue from './CommissionQueue';

// define DB relationships
CommissionQueue.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    },
    targetKey: 'id',
});

CommissionQueue.hasMany(Commission, {
    foreignKey: {
        name: 'commission_queue_id',
        allowNull: false,
    },
    targetKey: 'id',
});

export default CommissionQueue;


