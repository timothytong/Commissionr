'use strict';

import CommFormResponse from './CommFormResponse';
import CommissionForm from '../commissionForm/CommissionForm';
import User from '../user/User';

// define DB relationships
CommFormResponse.belongsTo(User, {
    foreignKey: 'filled_by_user_id',
    targetKey: 'id',
});

CommFormResponse.belongsTo(CommissionForm, {
    foreignKey: 'comm_form_id',
    targetKey: 'id',
});

export default CommFormResponse;
