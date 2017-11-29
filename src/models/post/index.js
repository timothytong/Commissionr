'use strict';

import PostDb from './PostDb';
import UserDb from '../user/UserDb';

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

export default {
    postDb: PostDb,
}
