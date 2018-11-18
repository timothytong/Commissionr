'use strict';

import CommissionStage from './CommissionStage';
import Product from '../product/Product';

// define DB relationships
CommissionStage.belongsTo(Product, {
    foreignKey: 'product_id',
    targetKey: 'id',
});

export default CommissionStage;

