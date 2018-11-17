'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';
import ProductModels from '../product/Product';
import CommissionFormModels from '../commissionForm/CommissionForm';

const OFFER_TABLE = 'offers';

const Offer = Database.define(OFFER_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    form_content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    comm_form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: CommissionFormModels.commissionForm,
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: ProductModels.product,
        },
    },
});

export default Offer;
