'use strict';

import CommissionFormDb from './CommissionFormDb';
import FormAttributeDb from '../formAttribute/FormAttributeDb';
import UserDb from '../user/UserDb';

// define DB relationships
CommissionFormDb.belongsTo(UserDb, {
    foreignKey: 'user_id',
    targetKey: 'id',
});

CommissionFormDb.hasMany(FormAttributeDb, {
    foreignKey: 'comm_form_id',
    targetKey: 'id',
});

export default {
    commissionFormDb: CommissionFormDb
};
