'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';
import CommissionFormModels from '../commissionForm/CommissionForm';
import UserModels from '../user/User';

const COMMISSION_TABLE = 'commissions';

export default Database.define(COMMISSION_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    final_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    state: {
        type: DataTypes.ENUM('queued', 'started', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'queued',
    },
    position_in_queue: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    /*
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
    */
},
{
    timestamps: true,
    underscored: true,
});

