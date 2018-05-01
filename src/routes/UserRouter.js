// @ flow

'use strict';

import { Router }  from 'express';
import UserModels from '../models/user';
import bcrypt from 'bcryptjs';

type CreateUserParams = {
    username: string,
    password: string,
    email: string,
};

const SALT_ROUNDS = 10;

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
        this.updateProfile = this.updateProfile.bind(this);
        this.init();
    }
    /**
    * Attach route handlers to their endpoints.
    */
    init(): void {
        this.router.post('/create', this.createUser);
        this.router.post('/validate', this.validateUser);
        this.router.post('/login', this.loginUser);
        this.router.post('/delete', this.deleteUser);
        this.router.post('/changePassword', this.changePassword);
        this.router.post('/updateProfile', this.updateProfile);
        this.router.get('/logout', this.logout);
        this.router.get('/session', this.getSession);
    }

    getSession(req: $Request, res: $Response): void {
        if (!!req.session.key) {
            console.log(req.session.key['id']);
            return res.status(200).json({
                message: 'User is logged in',
                user_name: req.session.key.user_name,
                email: req.session.key.email,
            });
        } else {
            return res.status(401).json({
                message: 'User not logged in'
            })
        }
    }

    changePassword(req: $Request, res: $Response): void {
        const { body } = req;
        const userId = req.session.key['id'];
        const password = body.password;
        const newPassword = body.newPassword;
        let errorMsg = 'Incorrect password supplied.';

        UserModels.userDb.update({
            password: newPassword
        },{
            where: {
                id: userId,
                password: password,
            },
            returns: true,
        }).then((data) => {
            if (data[0] > 0) {
                return res.status(200).json({
                    message: 'Successfully changed password.',
                });
            } else {
                return res.status(400).json({
                    message: errorMsg,
                    error: err.message,
                });
            }
        }).catch((err) => {
            return res.status(400).json({
                message: errorMsg,
                error: err.message,
            });
        });
    }

    updateUser(editInfo, userId, successHandler, errorHandler) {
        UserModels.userDb.update(editInfo, {
            where: {
                id: userId,
            },
            returning: true,
            plain: true,
        }).then((data) => {
            if (!!data[1].dataValues) {
                successHandler(data[1].dataValues);
            } else {
                errorHandler({});
            }
        }).catch((err) => {
            errorHandler(err);
        });
    }

    updateProfile(req: $Request, res: $Response): void {
        const { body } = req;
        const userId = req.session.key['id'];
        const email = body.email;
        const username = body.username;
        let errorMsg = 'Invalid username or email.';
        const onSuccessHandler = (data) => {
            req.session.key = data;
            return res.status(200).json({
                message: 'Successfully updated profile.',
            });
        }
        const onErrorHandler = (err) => {
            return res.status(500).json({
                message: errorMsg,
                error: err.message,
            });
        }
        const editInfo = {};

        if (!!email) {
            if (!isEmailAddressValid(email)) {
                return res.status(400).json({
                    message: 'Invalid email.',
                });
            }
            editInfo.email = email;
        }

        if (!!username) {
            return checkUserNameExists(username).then((data) => {
                if (!!data) {
                    return res.status(400).json({
                        message: 'Username unavailable.',
                        error: err.message,
                    });
                } else {
                    editInfo.user_name = username;
                    return this.updateUser(editInfo, userId, onSuccessHandler, onErrorHandler);
                }
            }).catch((err) => {
                return res.status(400).json({
                    message: errorMsg,
                    error: err.message,
                });
            });
        }

        return this.updateUser(editInfo, userId, onSuccessHandler, onErrorHandler);

    }

    loginUser(req: $Request, res: $Response): void {
        const { body } = req;
        const username = body.username;
        const password = body.password;

        UserModels.userDb.findOne({
            where: {
                user_name: username,
                active: true,
            }
        }).then((data) => {
            if (!!data) {
                const user = data.dataValues;
                bcrypt.compare(password, user.password, (err, correct) => {
                    if (!err && correct) {
                        req.session.key = data.dataValues;
                        return res.status(200).json({
                            message: 'Login successful.',
                        });
                    }
                    return res.status(400).json({
                        message: 'Invalid username or password',
                    });
                });
            } else {
                return res.status(404).json({
                    message: `User ${username} does not exist`,
                    error: err,
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Unknown error',
                error: err,
            });
        });
    }

    logout(req: $Request, res: $Response): void {
        if (!!req.session.key) {
            delete req.session.key;
            return res.status(200).json({
                message: 'Successfully logged out.',
            });
        } else {
            return res.status(401).json({
                message: 'User not authenticated.'
            })
        }
    }

    deleteUser(req: $Request, res: $Response): void {
        const { body } = req;
        let errorMsg = 'User cannot be deleted.';

        if (!!req.session.key) {
            const userId = req.session.key['id'];
            UserModels.userDb.update({
                active: false,
            },{
                where: {
                    id: userId,
                },
                returns: true,
            }).then((data) => {
                if (data[0] > 0) {
                    delete req.session.key;
                    return res.status(200).json({
                        message: 'Successfully deleted user.',
                    });
                } else {
                    return res.status(400).json({
                        message: errorMsg,
                        error: err.message,
                    });
                }
            }).catch((err) => {
                return res.status(400).json({
                    message: errorMsg,
                    error: err.message,
                });
            });
        } else {
            return res.status(401).json({
                message: 'User not authenticated.'
            })
        }
    }

    validateUser(req: $Request, res: $Response): void {
        const { body } = req;
        const username = body.username;
        let errorMsg = 'User already exists.';

        checkUserNameExists(username).then((data) => {
            if (!!data) {
                return res.status(400).json({
                    message: errorMsg,
                    error: err.message,
                });
            } else {
                return res.status(200).json({
                    message: 'Username available.',
                });
            }
        }).catch((err) => {
            return res.status(400).json({
                message: errorMsg,
                error: err.message,
            });
        });

    }

    createUser(req: $Request, res: $Response): void {
        const { body } = req;
        bcrypt.hash(body.password, SALT_ROUNDS, (err, hash) => {
            if (!!err) {
                return res.status(500).json({
                    message: 'Unable to hash password',
                    error: err
                });
            }

            const params : CreateUserParams = {
                username: body.username,
                password: hash,
                email: body.email,
            };

            checkUserNameExists(params.username).then((data) => {
                if (!!data) {
                    return res.status(400).json({
                        message: 'User already exists',
                        error: 'Known error'
                    });
                } else {
                    UserModels.userDb.create({
                        user_name: params.username,
                        password: params.password,
                        email: params.email,
                        active: true,
                    }).then((data) => {
                        return res.status(200).json({
                            message: 'User created.',
                        });
                    }).catch((err) => {
                        return res.status(400).json({
                            message: 'Unable to create user',
                            error: err,
                        });
                    })
                }
            }).catch((err) => {
                return res.status(500).json({
                    message: 'Unknown error',
                    error: err
                });
            })
        });
    }

}

function checkUserNameExists (username) {
    return UserModels.userDb.findOne({
        where: {
            user_name: username,
            active: true,
        }
    });
}

function isEmailAddressValid (email) {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!email.match(emailRegex)) {
        return false;
    }
    return true;
}
