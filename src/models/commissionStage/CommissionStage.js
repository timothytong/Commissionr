'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';
import CommissionModels from '../commission/Commission';
import ProductModels from '../product/Product';

const COMMISSION_STAGE_TABLE = 'commission_stages';

const CommissionStage = Database.define(COMMISSION_STAGE_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: ProductModels.product,
        },
    },
},
{
    timestamps: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['product_id', 'position']
        },
    ],
});

export default CommissionStage;


