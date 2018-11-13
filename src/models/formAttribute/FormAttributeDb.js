'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';
import CommissionFormModels from '../commisionForm/CommissionFormDb';

const FORM_ATTRIBUTE_TABLE = 'form_attributes';

const FormAttributeDb = Database.define(FORM_ATTRIBUTE_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    attr: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    additional_cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    comm_form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: CommissionFormModels.commissionFormDb,
        },
    },
});

export default FormAttributeDb;
