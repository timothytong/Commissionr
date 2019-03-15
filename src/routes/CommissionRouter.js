// @ flow

'use strict';

import { Router }  from 'express';
import { DOMAIN_URL } from '../utils/Constants';

import User from '../models/user';
import Commission from '../models/commission';
import Utils from '../utils/Utils';

export default class CommissionRouter {
    // these fields must be type annotated, or Flow will complain!
    router: Router;
    path: string;

    // take the mount path as the constructor argument
    constructor(path = '/api/v1/commission') {
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
        this.router.get('/list/user/:user_id', this.getUserCommissions);
    }

    getUserCommissions(req: $Request, res: $Response) {
        const commissionerId = req.params.user_id;

        Commission.findAll({
            where: {
                commissioner_id: commissionerId,
            },
        }).then((commissions) => {
            return res.status(200).json({
                commissions: commissions,
            });
        }).catch((err) => {
            return res.status(404).json({
                message: 'Unable to find user',
                error: err,
            });
        });
    }

}
