'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';
import UserModels from '../user/User';

const COMMISSION_FORM_TABLE = 'commission_forms';

const CommissionForm = Database.define(COMMISSION_FORM_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    is_open: {
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
});

export default CommissionForm;
