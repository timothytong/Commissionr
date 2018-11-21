'use strict';

import Commission from '../commission/Commission';
import CommissionStage from '../commissionStage/CommissionStage';
import CommissionStatus from './CommissionStatus';

// define DB relationships
CommissionStatus.belongsTo(CommissionStage, {
    foreignKey: 'comm_stage_id',
    targetKey: 'id',
});

CommissionStatus.belongsTo(Commission, {
    foreignKey: 'commission_id',
    targetKey: 'id',
});

export default CommissionStatus;


