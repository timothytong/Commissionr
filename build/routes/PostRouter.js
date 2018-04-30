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

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

var _attribute = require('../models/attribute');

var _attribute2 = _interopRequireDefault(_attribute);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _maps = require('@google/maps');

var _maps2 = _interopRequireDefault(_maps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logger = new _Logger2.default();
var DB_ERROR = 'An error with the query has occurred.';

var PostRouter = function () {

    // take the mount path as the constructor argument
    function PostRouter() {
        var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/api/v1/post';

        _classCallCheck(this, PostRouter);

        // instantiate the express.Router
        this.router = (0, _express.Router)();
        var googleMapsClient = _maps2.default.createClient({
            key: 'AIzaSyCqdarCsFQeR7h6Kl643pyk6c8sXxlkHO0'
        });
        this.googleClient = googleMapsClient;
        this.path = path;
        // glue it all together
        this.createPost = this.createPost.bind(this);
        this.init();
    }

    /**
    * Attach route handlers to their endpoints.
    */

    // these fields must be type annotated, or Flow will complain!


    _createClass(PostRouter, [{
        key: 'init',
        value: function init() {
            this.router.post('/create', this.createPost);
            this.router.delete('/delete/:id', this.deletePost);
            this.router.post('/edit/:id', this.editPost);
            this.router.get('/userposts/:username', this.getUserPosts);
            this.router.get('/logged-in-userposts', this.getLoggedInUserPosts);
            this.router.get('/get/:id', this.getPost);
            this.router.post('/found/:id', this.markAsFound);
        }
    }, {
        key: 'getPost',
        value: function getPost(req, res) {
            var postId = req.params.id;
            var errorMsg = 'Unable to find post.';

            _post2.default.postDb.findOne({
                where: {
                    id: postId,
                    deleted: false
                },
                include: [{
                    model: _attribute2.default.attributeDb,
                    as: 'additional_attributes',
                    attributes: { exclude: ['id', 'post_id'] }
                }]
            }).then(function (data) {
                if (!!data) {
                    return res.status(200).json({
                        data: data
                    });
                } else {
                    return res.status(404).json({
                        message: 'Specified post does not exist.'
                    });
                }
            }).catch(function (err) {
                logger.error(errorMsg, err, err.message);
                return res.status(401).json({ message: errorMsg });
            });
        }
    }, {
        key: 'getUserPosts',
        value: function getUserPosts(req, res) {
            var username = req.params.username;
            var errorMsg = 'Unable to find user.';

            _user2.default.userDb.findOne({
                where: {
                    user_name: username,
                    active: true
                }
            }).then(function (user) {
                if (!!user) {
                    errorMsg = 'Unable to find posts.';
                    _post2.default.postDb.findAll({
                        where: {
                            submitter_user_id: user.id,
                            deleted: false,
                            found: false
                        },
                        include: [{
                            model: _attribute2.default.attributeDb,
                            as: 'additional_attributes',
                            attributes: { exclude: ['id', 'post_id'] }
                        }]
                    }).then(function (data) {
                        return res.status(200).json({
                            data: data
                        });
                    }).catch(function (err) {
                        logger.error(errorMsg, err, err.message);
                        return res.status(400).json({ message: errorMsg });
                    });
                } else {
                    return res.status(404).json({
                        message: 'User does not exist.'
                    });
                }
            }).catch(function (err) {
                logger.error(errorMsg, err, err.message);
                return res.status(401).json({ message: errorMsg });
            });
        }
    }, {
        key: 'getLoggedInUserPosts',
        value: function getLoggedInUserPosts(req, res) {
            var errorMsg = 'Unable to find posts.';

            if (!!req.session.key) {
                _post2.default.postDb.findAll({
                    where: {
                        submitter_user_id: req.session.key['id'],
                        deleted: false,
                        found: false
                    },
                    include: [{
                        model: _attribute2.default.attributeDb,
                        as: 'additional_attributes',
                        attributes: { exclude: ['id', 'post_id'] }
                    }]
                }).then(function (data) {
                    return res.status(200).json({
                        data: data
                    });
                }).catch(function (err) {
                    logger.error(errorMsg, err, err.message);
                    return res.status(400).json({ message: errorMsg });
                });
            } else {
                return res.status(401).json({
                    message: 'User not authenticated.'
                });
            }
        }
    }, {
        key: 'deletePost',
        value: function deletePost(req, res) {
            var postId = req.params.id;
            var errorMsg = 'Unable to delete post.';

            if (!!req.session.key) {
                _post2.default.postDb.update({
                    deleted: true
                }, {
                    where: {
                        id: postId,
                        submitter_user_id: req.session.key['id']
                    },
                    returns: true
                }).then(function (data) {
                    if (data[0] > 0) {
                        return res.status(202).json({
                            message: 'Successfully deleted post.'
                        });
                    } else {
                        return res.status(401).json({
                            message: 'User not authenticated.'
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
        key: 'reverseGeocode',
        value: function reverseGeocode(post, onComplete) {
            return this.googleClient.reverseGeocode({
                latlng: [post.latitude, post.longitude]
            }, function (error, data) {
                if (error === null && data.json.results.length !== 0) {
                    post.formattedAddress = data.json.results[0].formatted_address;
                } else {
                    var rawData = 'Latitude (' + post.latitude + '), Longitude (' + post.longitude + ')';
                    post.formattedAddress = rawData;
                }
                onComplete(post);
            });
        }
    }, {
        key: 'createPost',
        value: function createPost(req, res) {
            var body = req.body;

            var params = {
                name: body.name,
                lastSeen: body.lastSeen,
                reward: body.reward,
                longitude: body.longitude,
                latitude: body.latitude,
                contact: body.contact,
                description: body.description,
                submitterUserId: req.session.key['id']
            };
            if (params.longitude < -180 || params.longitude > 180 || params.latitude < -90 || params.latitude > 90) {
                return res.status(400).json({
                    message: 'Invalid longitude-latitude combination.'
                });
            }
            this.reverseGeocode(params, function (post) {
                var errorMsg = 'Unable to create post.';
                if (!!req.session.key) {
                    _post2.default.postDb.create({
                        name: post.name,
                        last_seen: post.lastSeen,
                        reward: post.reward,
                        longitude: post.longitude,
                        latitude: post.latitude,
                        contact: post.contact,
                        description: post.description,
                        formatted_address: post.formattedAddress,
                        submitter_user_id: post.submitterUserId
                    }).then(function (data) {
                        var additionalAttributes = body.additionalAttributes.map(function (attr) {
                            attr.post_id = data.id;
                            return attr;
                        });
                        _attribute2.default.attributeDb.bulkCreate(additionalAttributes, { individualHooks: true }).then(function (data) {
                            return res.status(200).json({
                                message: 'Post created.'
                            });
                        }).catch(function (err) {
                            logger.error(errorMsg, err, err.message);
                            return res.status(400).json({
                                message: errorMsg,
                                error: err.message
                            });
                        });
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
            });
        }
    }, {
        key: 'editPost',
        value: function editPost(req, res) {
            var postId = req.params.id;
            var body = req.body;


            var errorMsg = 'Unable to edit post.';

            if (body.longitude < -180 || body.longitude > 180 || body.latitude < -90 || body.latitude > 90) {
                return res.status(400).json({
                    message: 'Invalid longitude-latitude combination.'
                });
            }

            if (!!req.session.key) {
                _post2.default.postDb.update({
                    name: body.name,
                    last_seen: body.lastSeen,
                    reward: body.reward,
                    longitude: body.longitude,
                    latitude: body.latitude,
                    contact: body.contact,
                    description: body.description,
                    formatted_address: body.formattedAddress
                }, {
                    where: {
                        id: postId,
                        submitter_user_id: req.session.key['id']
                    },
                    returns: true
                }).then(function (data) {
                    if (data[0] > 0) {
                        return res.status(200).json({
                            message: 'Successfully edited post.'
                        });
                    } else {
                        return res.status(401).json({
                            message: 'User not authenticated.'
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
        key: 'markAsFound',
        value: function markAsFound(req, res) {
            var postId = req.params.id;
            var body = req.body;

            var username = body.username;

            if (!!req.session.key) {
                _user2.default.userDb.findOne({
                    where: {
                        user_name: username,
                        active: true
                    }
                }).then(function (data) {
                    var foundUserId = null;
                    if (!!data) {
                        foundUserId = data.dataValues.id;
                    } else {
                        return res.status(404).json({
                            message: 'Username not found.'
                        });
                    }
                    _post2.default.postDb.update({
                        found: true,
                        found_user_id: foundUserId
                    }, {
                        where: {
                            id: postId,
                            submitter_user_id: req.session.key['id'],
                            found: false
                        },
                        returning: true,
                        plain: true
                    }).then(function (data) {
                        console.log(data);
                        if (!!data && !!data[1].dataValues) {
                            return res.status(200).json({
                                message: 'Successfully marked as found.'
                            });
                        } else {
                            return res.status(500).json({
                                message: 'Internal server error.'
                            });
                        }
                    }).catch(function (err) {
                        return res.status(400).json({
                            message: 'User not authorized.',
                            error: err.message
                        });
                    });
                });
            } else {
                return res.status(401).json({
                    message: 'User not authenticated.'
                });
            }
        }
    }]);

    return PostRouter;
}();

exports.default = PostRouter;
//# sourceMappingURL=PostRouter.js.map
