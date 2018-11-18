'use strict';

import Commission from '../user/Commission';
import CommissionStage from '../offer/CommissionStage';
import CommissionStatus from './CommissionStatus';

// define DB relationships
CommissionStatus.hasOne(CommissionStage, {
    foreignKey: 'comm_stage_id',
    targetKey: 'id',
});

CommissionStatus.belongsTo(Commission, {
    foreignKey: 'commission_id',
    targetKey: 'id',
});

export default {
    commissionStatus: CommissionStatus,
}


