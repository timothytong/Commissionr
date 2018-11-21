'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';

const COMMISSION_QUEUES_TABLE = 'commission_queues';

export default Database.define(COMMISSION_QUEUES_TABLE, {
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
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    timestamps: true,
    underscored: true,
});
