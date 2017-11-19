// @ flow

'use strict';

import Logger from '../utils/Logger';
import { validRegion, createOrFindAddress, createUserAddress } from '../utils/AddressUtils';
import type { AddressParams } from '../utils/AddressUtils';
import { Router }  from 'express';
import UserModels from '../models/user';
import bcrypt from 'bcryptjs';

type LoginParams = {
    phoneNumber?: string,
    email?: string,
    password: string,
};

const logger = new Logger();
const USER_SELECT_FIELD = 'id, first_name, last_name, phone_number, email';
const DB_ERROR = 'An error with the query has occurred.';

export default class UserRouter {
    // these fields must be type annotated, or Flow will complain!
    router: Router;
    path: string;

    // take the mount path as the constructor argument
    constructor(path = '/api/v1/user') {
        // instantiate the express.Router
        this.router = Router();
        this.path = path;
        // glue it all together
        this.init();
	}

    getUsers(req: $Request, res: $Response): void {
        let errorMsg : string = 'Getting all users.';

        UserModels.userDb.findAll({
            attributes: ['id', 'restaurant_name', 'phone_number', 'email'],
            include: [{
                model: UserModels.addressDb,
                attributes: ['street_address', 'city', 'province', 'zip_postal_code', 'country'],
            }]
        }).then((users) => {
            res.status(200).json({
                message: 'Success',
                users: users,
            });
        }).catch((err) => {
            logger.error(errorMsg, err.code, err.message);
            return res.status(400).send(DB_ERROR);
        });
    }

    createUser(req: $Request, res: $Response): void {
        let sesh = req.session;
        const body = req.body;
        const addressParams : AddressParams = {
            streetAddress: body.streetAddress,
            city: body.city,
            postalCode: body.postalCode,
            province: body.province,
            country: body.country
        };
        let errorMsg : string = 'Creating or finding address.';

        createOrFindAddress(addressParams, res).then((foundAddressId) => {
            errorMsg = 'Creating user.';
            return UserModels.userDb.create({
                restaurant_name: body.restaurantName,
                restaurant_address_id: foundAddressId,
                phone_number: body.phoneNumber,
                email: body.email,
                password: body.password,
            });
        }).then((data) => {
            sesh.key = data;

            return res.status(200).json({
                message: 'User created.',
            });
        }).catch((err) => {
            return res.status(400).json(logger.error(errorMsg, err, err.message));
        });
    }

    login(req: $Request, res: $Response): void {
        let query = {};

        if (!req.body.password || (!req.body.email && !req.body.phoneNumber))
            return res.status(400).json({
                message: 'Password and phone number / email are needed to login'
            });

        if (req.body.phoneNumber) {
            query.phone_number = req.body.phoneNumber;
        } else {
            query.email = req.body.email;
        }
        query.password = req.body.password;

        UserModels.userDb.findOne({
            where: query,
            attributes: [
                'id',
                'restaurant_name',
                'restaurant_address_id',
                'phone_number',
                'email'
            ],
            include: [{
                model: UserModels.addressDb,
                attributes: [
                    'street_address',
                    'city',
                    'province',
                    'zip_postal_code',
                    'country'
                ],
            }]
        }).then((data) => {
            if (!data)
                return res.status(401).json({
                    message: 'Invalid login credentials.'
                });
            req.session.key = data;

            return res.status(200).json({
                message: 'User has been logged in.',
            });
        }).catch((err) => {
            return res.status(400).json(logger.error('Logging in.', err, err.message));
        });
    }

    resetPassword(req: $Request, res: $Response): void {
        const phoneNumber : string = req.body.phoneNumber;
        const password : string = req.body.password;
        let errorMsg : string = 'Resetting password.';

        UserModels.userDb.update({
            password: password,
        }, {
            where: {
                phone_number: phoneNumber,
            },
            returns: true,
        }).then((data) => {
            if (data[0] > 0) {
                return res.status(200).json({
                    message: 'Password has been successfully reset!',
                });
            } else {
                return res.status(404).send('User does not exist');
            }
        }).catch((err) => {
            logger.error(errorMsg, err.code, err.message);
            return res.status(400).send(DB_ERROR);
        });
    }

    changePassword(req: $Request, res: $Response): void {
        const userId : string = req.session.key['id'];
        const password : string = req.body.password;
        const oldPassword : string = req.body.oldPassword;
        let errorMsg : string = 'Resetting password.';

        UserModels.userDb.update({
            password: password,
        }, {
            where: {
                id: userId,
                password: oldPassword,
            },
            returns: true,
        }).then((data) => {
            if (data[0] > 0) {
                return res.status(200).json({
                    message: 'Password has been successfully changed!',
                });
            } else {
                return res.status(404).json({
                    message: 'User and password do not match',
                });
            }
        }).catch((err) => {
            logger.error(errorMsg, err.code, err.message);
            return res.status(400).json({
                mesasage: DB_ERROR,
            });
        });
    }

    getAddress(req: $Request, res: $Response): void {
        const sesh = req.session;
        let errorMsg : string = 'Getting address.';
        UserModels.addressDb.findOne({
            where: {
                id: sesh.key['restaurant_address_id'],
            }
        }).then((data) => {
            return res.status(200).json({
                message: 'Retrieved address.',
                address: data,
            });
        }).catch((err) => {
            logger.error(errorMsg, err.code, err.message);
            return res.status(400).send(DB_ERROR);
        });
    }

    checkSession(req: $Request, res: $Response): void {
        return req.session.key ?
                res.status(200).json({message: 'Session is valid.'}) :
                res.status(404).json({message: 'Session has expired or there is no session.'});
    }

    checkAdminSession(req: $Request, res: $Response): void {
        return req.session.key ?
            res.status(200).json({message: 'Session is valid.'}) :
            res.status(404).json({message: 'Session has expired or there is no session.'});
    }

    adminLogin(req: $Request, res: $Response): void {
        const adminName = process.env.ADMIN_NAME;
        const adminPwHash = process.env.ADMIN_PW;
        if (adminName !== req.body.username) {
            return res.status(401).send('Invalid login credentials.');
        }

        bcrypt.compare(req.body.password, adminPwHash, (err, correct) => {
            if (correct) {
                req.session.key = adminName;
                return res.status(200).json({
                    message: 'Admin has been logged in.',
                });
            } else {
                return res.status(401).send('Invalid login credentials.');
            }
        });
    }

    isPhoneUsed(req: $Request, res: $Response): void {
        const number = req.params.number;
        let errorMsg : string = 'Checking if phone number is used.';

        UserModels.userDb.findOne({
            where: {
                phone_number: number,
            }
        }).then((data) => {
            return res.status(200).json({
                message: 'Checked if phone is used.',
                isUsed: data ? true : false,
            })
        }).catch((err) => {
            logger.error(errorMsg, err.code, err.message);
            return res.status(400).send(DB_ERROR);
        });
    }

    /**
    * Attach route handlers to their endpoints.
    */
    init(): void {
        this.router.get('/fetch', this.getUsers);
        this.router.post('/create', this.createUser);
        this.router.post('/login', this.login);
        this.router.post('/reset/password', this.resetPassword);
        this.router.post('/change/password', this.changePassword)
        this.router.get('/address', this.getAddress);
        this.router.get('/session', this.checkSession);
        this.router.get('/admin/session', this.checkAdminSession);
        this.router.post('/admin/login', this.adminLogin);
        this.router.get('/phone/:number', this.isPhoneUsed);
    }
}
