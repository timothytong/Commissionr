'use strict';

import PostDb from './PostDb';
import UserDb from '../user/UserDb';
import AttributeDb from '../attribute/AttributeDb';

// define DB relationships
PostDb.belongsTo(UserDb, {
    foreignKey: 'submitter_user_id',
    targetKey: 'id',
    as: 'submitter',
});
PostDb.belongsTo(UserDb, {
    foreignKey: 'found_user_id',
    targetKey: 'id',
    as: 'finder',
});
PostDb.hasMany(AttributeDb, {
    foreignKey: 'post_id',
    sourceKey: 'id',
    as: 'additional_attributes',
});

export default {
    postDb: PostDb,
}
