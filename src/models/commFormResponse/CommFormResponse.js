'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';
import CommissionFormModels from '../commissionForm/CommissionForm';
import UserModels from '../user/User';

const COMM_FORM_RESPONSE_TABLE = 'comm_form_responses';

const CommFormResponse = Database.define(COMM_FORM_RESPONSE_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    final_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    is_voided: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    is_accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: UserModels.user,
        },
    },
    comm_form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: UserModels.user,
        },
    },
});

export default CommFormResponse;

