// @ flow

'use strict';

import { Router }  from 'express';
import { DOMAIN_URL } from '../utils/Constants';

import User from '../models/user';
import CommissionStage from '../models/commissionStage';
import Utils from '../utils/Utils';

export default class CommissionStageRouter {
    // these fields must be type annotated, or Flow will complain!
    router: Router;
    path: string;

    // take the mount path as the constructor argument
    constructor(path = '/api/v1/commission_stage') {
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
        this.router.get('/list/product/:product_id', this.getCommissionStages);
    }

    getCommissionStages(req: $Request, res: $Response) {
        const productId = req.params.product_id;

        CommissionStage.findAll({
            where: {
                product_id: productId,
            },
        }).then((commissionStages) => {
            return res.status(200).json({
                commissionStages: commissionStages,
            });
        }).catch((err) => {
            return res.status(404).json({
                message: 'Unable to find product',
                error: err,
            });
        });
    }

}
