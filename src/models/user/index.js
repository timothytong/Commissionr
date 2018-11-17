'use strict';

import CommissionForm from '../commisionForm/CommissionForm';
import User from './User';

// define DB relationships
User.hasMany(CommissionForm, {
    foreignKey: 'comm_form_id',
    targetKey: 'id',
});

export default {
    user: User,
}
