'use strict';

import CommissionForm from '../commissionForm/CommissionForm';
import User from '../user/User';
import Offer from '../offer/Offer';
import Product from './Product';

// define DB relationships
Product.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
});

Product.belongsToMany(CommissionForm, {
    through: Offer,
    foreignKey: 'product_id',
    targetKey: 'id',
});

export default {
    product: Product,
}

