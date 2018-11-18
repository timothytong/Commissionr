'use strict';

import CommissionForm from './CommissionForm';
import Offer from '../offer/Offer';
import Product from '../product/Product';
import User from '../user/User';

// define DB relationships
CommissionForm.belongsTo(User, {
    foreignKey: 'merchant_user_id',
    targetKey: 'id',
});

CommissionForm.belongsToMany(Product, {
    through: Offer,
    foreignKey: 'comm_form_id',
    targetKey: 'id',
});

export default {
    commissionForm: CommissionForm,
};
