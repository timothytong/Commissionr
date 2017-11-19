'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';
import AddressDb from './AddressDb';
export const BILL_TYPES = {
    NONE: 'none',
    LAST_DAY: 'last_day',
};
export const BILL_TYPES_ARRAY = ['none', 'last_day'];

const USERS_TABLE = 'users';

const UserDb = Database.define(USERS_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

export default UserDb;
