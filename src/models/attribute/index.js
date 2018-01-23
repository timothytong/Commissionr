'use strict';

import PostDb from '../post/PostDb';
import AttributeDb from './AttributeDb';

// define DB relationships
AttributeDb.belongsTo(PostDb, {
    foreignKey: 'post_id',
    targetKey: 'id',
    as: 'post',
});

export default {
    attributeDb: AttributeDb,
}
