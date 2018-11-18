'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';
import CommissionModels from '../commission/Comission';
import CommissionStageModels from '../commissionStage/ComissionStage';

const COMMISSION_STATUS_TABLE = 'commission_statuses';

const CommissionStatus = Database.define(COMMISSION_STATUS_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    wips: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
    },
    commission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: CommissionModels.commission,
        },
    },
    comm_stage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: CommissionStageModels.commissionStage,
        },
    },
},
{
    timestamps: true,
    underscored: true,
});

export default CommissionStatus;

