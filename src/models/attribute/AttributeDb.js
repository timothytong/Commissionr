'use strict';

import Database from '../Database';
import { DataTypes } from 'sequelize';
import PostModels from '../post/PostDb';

const ATTRIBUTE_TABLE = 'attributes';

const AttributeDb = Database.define(ATTRIBUTE_TABLE, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: PostModels.postDb,
        }
    },
});

export default AttributeDb;
