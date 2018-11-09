'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';

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
    display_name: {
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
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    is_merchant: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    show_nsfw: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

export default UserDb;
