'use strict';

import moment from 'moment';

import Database from '../Database';
import { DataTypes } from 'sequelize';

const USERS_TABLE = 'users';

export default Database.define(USERS_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    display_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    show_nsfw: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    user_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    timestamps: true,
    underscored: true,
});
