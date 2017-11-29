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
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    animal: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true,
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_aggressive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    completed_shots: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    has_chip: {
        type: DataTypes.BOOLEAN,
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
