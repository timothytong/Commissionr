'use strict';

import Commission from './Commission';
import CommissionForm from '../commissionForm/CommissionForm';
import User from '../user/User';

// define DB relationships
Commission.belongsTo(User, {
    foreignKey: 'filled_by_user_id',
    targetKey: 'id',
});

Commission.belongsTo(CommissionForm, {
    foreignKey: 'comm_form_id',
    targetKey: 'id',
});

export default {
    commission: Commission,
};

