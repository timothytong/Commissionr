// @ flow

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Logger = require('../utils/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _express = require('express');

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logger = new _Logger2.default();
var DB_ERROR = 'An error with the query has occurred.';

var UserRouter = function () {

    // take the mount path as the constructor argument

    // these fields must be type annotated, or Flow will complain!
    function UserRouter() {
        var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/api/v1/user';

        _classCallCheck(this, UserRouter);

        // instantiate the express.Router
        this.router = (0, _express.Router)();
        this.path = path;
        // glue it all together
        this.updateProfile = this.updateProfile.bind(this);
        this.init();
    }
    /**
    * Attach route handlers to their endpoints.
    */


    _createClass(UserRouter, [{
        key: 'init',
        value: function init() {
            this.router.post('/create', this.createUser);
            this.router.post('/validate', this.validateUser);
            this.router.post('/login', this.loginUser);
            this.router.post('/delete', this.deleteUser);
            this.router.post('/changePassword', this.changePassword);
            this.router.post('/updateProfile', this.updateProfile);
            this.router.get('/logout', this.logout);
            this.router.get('/session', this.getSession);
        }
    }, {
        key: 'getSession',
        value: function getSession(req, res) {
            if (!!req.session.key) {
                console.log(req.session.key['id']);
                return res.status(200).json({
                    message: 'User is logged in',
                    user_name: req.session.key.user_name,
                    email: req.session.key.email
                });
            } else {
                return res.status(401).json({
                    message: 'User not logged in'
                });
            }
        }
    }, {
        key: 'changePassword',
        value: function changePassword(req, res) {
            var body = req.body;

            var userId = req.session.key['id'];
            var password = body.password;
            var newPassword = body.newPassword;
            var errorMsg = 'Incorrect password supplied.';

            _user2.default.userDb.update({
                password: newPassword
            }, {
                where: {
                    id: userId,
                    password: password
                },
                returns: true
            }).then(function (data) {
                if (data[0] > 0) {
                    return res.status(200).json({
                        message: 'Successfully changed password.'
                    });
                } else {
                    return res.status(400).json({
                        message: errorMsg,
                        error: err.message
                    });
                }
            }).catch(function (err) {
                logger.error(errorMsg, err, err.message);
                return res.status(400).json({
                    message: errorMsg,
                    error: err.message
                });
            });
        }
    }, {
        key: 'updateUser',
        value: function updateUser(editInfo, userId, successHandler, errorHandler) {
            _user2.default.userDb.update(editInfo, {
                where: {
                    id: userId
                },
                returning: true,
                plain: true
            }).then(function (data) {
                if (!!data[1].dataValues) {
                    successHandler(data[1].dataValues);
                } else {
                    errorHandler({});
                }
            }).catch(function (err) {
                errorHandler(err);
            });
        }
    }, {
        key: 'updateProfile',
        value: function updateProfile(req, res) {
            var _this = this;

            var body = req.body;

            var userId = req.session.key['id'];
            var email = body.email;
            var username = body.username;
            var errorMsg = 'Invalid username or email.';
            var onSuccessHandler = function onSuccessHandler(data) {
                req.session.key = data;
                return res.status(200).json({
                    message: 'Successfully updated profile.'
                });
            };
            var onErrorHandler = function onErrorHandler(err) {
                return res.status(500).json({
                    message: errorMsg,
                    error: err.message
                });
            };
            var editInfo = {};

            if (!!email) {
                if (!isEmailAddressValid(email)) {
                    return res.status(400).json({
                        message: 'Invalid email.'
                    });
                }
                editInfo.email = email;
            }

            if (!!username) {
                return checkUserNameExists(username).then(function (data) {
                    if (!!data) {
                        return res.status(400).json({
                            message: 'Username unavailable.',
                            error: err.message
                        });
                    } else {
                        editInfo.user_name = username;
                        return _this.updateUser(editInfo, userId, onSuccessHandler, onErrorHandler);
                    }
                }).catch(function (err) {
                    logger.error(errorMsg, err, err.message);
                    return res.status(400).json({
                        message: errorMsg,
                        error: err.message
                    });
                });
            }

            return this.updateUser(editInfo, userId, onSuccessHandler, onErrorHandler);
        }
    }, {
        key: 'loginUser',
        value: function loginUser(req, res) {
            var body = req.body;

            var username = body.username;
            var password = body.password;
            var errorMsg = 'Invalid username or password.';

            _user2.default.userDb.findOne({
                where: {
                    user_name: username,
                    password: password,
                    active: true
                }
            }).then(function (data) {
                if (!!data) {
                    req.session.key = data.dataValues;
                    return res.status(200).json({
                        message: 'Login successful.'
                    });
                } else {
                    return res.status(400).json({
                        message: errorMsg,
                        error: err.message
                    });
                }
            }).catch(function (err) {
                logger.error(errorMsg, err, err.message);
                return res.status(400).json({
                    message: errorMsg,
                    error: err.message
                });
            });
        }
    }, {
        key: 'logout',
        value: function logout(req, res) {
            if (!!req.session.key) {
                delete req.session.key;
                return res.status(200).json({
                    message: 'Successfully logged out.'
                });
            } else {
                return res.status(401).json({
                    message: 'User not authenticated.'
                });
            }
        }
    }, {
        key: 'deleteUser',
        value: function deleteUser(req, res) {
            var body = req.body;

            var errorMsg = 'User cannot be deleted.';

            if (!!req.session.key) {
                var userId = req.session.key['id'];
                _user2.default.userDb.update({
                    active: false
                }, {
                    where: {
                        id: userId
                    },
                    returns: true
                }).then(function (data) {
                    if (data[0] > 0) {
                        delete req.session.key;
                        return res.status(200).json({
                            message: 'Successfully deleted user.'
                        });
                    } else {
                        return res.status(400).json({
                            message: errorMsg,
                            error: err.message
                        });
                    }
                }).catch(function (err) {
                    logger.error(errorMsg, err, err.message);
                    return res.status(400).json({
                        message: errorMsg,
                        error: err.message
                    });
                });
            } else {
                return res.status(401).json({
                    message: 'User not authenticated.'
                });
            }
        }
    }, {
        key: 'validateUser',
        value: function validateUser(req, res) {
            var body = req.body;

            var username = body.username;
            var errorMsg = 'User already exists.';

            checkUserNameExists(username).then(function (data) {
                if (!!data) {
                    return res.status(400).json({
                        message: errorMsg,
                        error: err.message
                    });
                } else {
                    return res.status(200).json({
                        message: 'Username available.'
                    });
                }
            }).catch(function (err) {
                logger.error(errorMsg, err, err.message);
                return res.status(400).json({
                    message: errorMsg,
                    error: err.message
                });
            });
        }
    }, {
        key: 'createUser',
        value: function createUser(req, res) {
            var body = req.body;

            var params = {
                username: body.username,
                password: body.password,
                email: body.email
            };
            var errorMsg = 'User already exists';

            checkUserNameExists(params.username).then(function (data) {
                if (!!data) {
                    return res.status(400).json({
                        message: errorMsg,
                        error: err.message
                    });
                } else {
                    errorMsg = 'Failed to create user.';

                    _user2.default.userDb.create({
                        user_name: params.username,
                        password: params.password,
                        email: params.email,
                        active: true
                    }).then(function (data) {
                        return res.status(200).json({
                            message: 'User created.'
                        });
                    }).catch(function (err) {
                        logger.error(errorMsg, err, err.message);
                        return res.status(400).json({
                            message: errorMsg,
                            error: err.message
                        });
                    });
                }
            }).catch(function (err) {
                logger.error(errorMsg, err, err.message);
                return res.status(400).json({
                    message: errorMsg,
                    error: err.message
                });
            });
        }
    }]);

    return UserRouter;
}();

exports.default = UserRouter;


function checkUserNameExists(username) {
    return _user2.default.userDb.findOne({
        where: {
            user_name: username,
            active: true
        }
    });
}

function isEmailAddressValid(email) {
    var emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!email.match(emailRegex)) {
        return false;
    }
    return true;
}
//# sourceMappingURL=UserRouter.js.map
