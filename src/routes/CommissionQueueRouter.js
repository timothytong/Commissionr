// @ flow

'use strict';

import { Router }  from 'express';
import { DOMAIN_URL } from '../utils/Constants';

import User from '../models/user';
import CommissionQueue from '../models/commissionQueue';
import Utils from '../utils/Utils';

export default class CommissionQueueRouter {
    // these fields must be type annotated, or Flow will complain!
    router: Router;
    path: string;

    // take the mount path as the constructor argument
    constructor(path = '/api/v1/commission_queue') {
        // instantiate the express.Router
        this.router = Router();
        this.path = path;
        // glue it all together
        this.init();
    }
    /**
    * Attach route handlers to their endpoints.
    */
    init() {
        this.router.get('/user/:user_id', this.getUserCommissionQueue);
    }

    getUserCommissionQueue(req: $Request, res: $Response) {
        const userId = req.params.user_id;

        CommissionQueue.findAll({
            where: {
                user_id: userId,
            },
        }).then((commissionQueue) => {
            return res.status(200).json({
                commissionQueue: commissionQueue,
            });
        }).catch((err) => {
            return res.status(404).json({
                message: 'Unable to find user',
                error: err,
            });
        });
    }

}
