'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';
import UserModels from '../user/User';
import CommissionFormModels from '../commisionForm/CommissionForm';

const PRODUCTS_TABLE = 'products';

const Product = Database.define(PRODUCTS_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    examples: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    is_sfw: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    base_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    comm_form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: CommissionFormModels.commissionForm,
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: UserModels.user,
        },
    },
});

export default Product;

