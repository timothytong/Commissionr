'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';
import UserModels from '../user/UserDb';

const POSTS_TABLE = 'posts';

const PostDb = Database.define(POSTS_TABLE, {
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
    last_seen: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    reward: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    found: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    found_user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        reference: {
            model: UserModels.userDb,
        }
    },
    formatted_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    submitter_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: UserModels.userDb,
        }
    }
});

export default PostDb;
