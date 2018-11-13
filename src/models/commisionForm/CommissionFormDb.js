'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';
import UserModels from '../user/UserDb';

const COMMISSION_FORM_TABLE = 'commission_forms';

const CommissionFormDb = Database.define(COMMISSION_FORM_TABLE, {
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
            model: UserModels.userDb,
        },
    },
});

export default CommissionFormDb;
