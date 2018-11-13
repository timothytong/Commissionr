'use strict';

import CommissionFormDb from '../commisionForm/CommissionFormDb';
import FormAttributeDb from './FormAttributeDb';

// define DB relationships
FormAttributeDb.belongsTo(CommissionFormDb, {
    foreignKey: 'comm_form_id',
    targetKey: 'id',
});

export default {
    formAttributeDb: FormAttributeDb,
}
