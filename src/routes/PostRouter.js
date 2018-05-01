// @ flow

'use strict';

import Logger from '../utils/Logger';
import { Router }  from 'express';
import UserModels from '../models/user';
import PostModels from '../models/post';
import AttributeModels from '../models/attribute';
import bcrypt from 'bcryptjs';
import googleMaps from '@google/maps';

type CreatePostParams = {
    name: string,
    lastSeen: date,
    reward: float,
    longitude: double,
    latitude: double,
    contact: string,
    description: string,
    formattedAddress: string,
    submitterUserId: number,
};

const logger = new Logger();
const DB_ERROR = 'An error with the query has occurred.';

export default class PostRouter {
    // these fields must be type annotated, or Flow will complain!
    router: Router;
    path: string;
    googleClient: Object;

    // take the mount path as the constructor argument
    constructor(path = '/api/v1/post') {
        // instantiate the express.Router
        this.router = Router();
        const googleMapsClient = googleMaps.createClient({
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
    init(): void {
        this.router.post('/create', this.createPost);
        this.router.delete('/delete/:id', this.deletePost);
        this.router.post('/edit/:id', this.editPost);
        this.router.get('/userposts/:username', this.getUserPosts);
        this.router.get('/logged-in-userposts', this.getLoggedInUserPosts);
        this.router.get('/get/:id', this.getPost);
        this.router.post('/found/:id', this.markAsFound);
    }

    getPost(req: $Request, res: $Response): void {
        const postId = req.params.id;
        const errorMsg : string = 'Unable to find post.';

        PostModels.postDb.findOne({
            where: {
                id: postId,
                deleted: false,
            },
            include: [
                {
                    model: AttributeModels.attributeDb,
                    as: 'additional_attributes',
                    attributes: {exclude: ['id', 'post_id']},
                },
            ],
        }).then((data) => {
            if (!!data) {
                return res.status(200).json({
                    data
                });
            } else {
                return res.status(404).json({
                    message: 'Specified post does not exist.'
                });
            }
        }).catch((err) => {
            logger.error(errorMsg, err, err.message);
            return res.status(401).json({message: errorMsg});
        });
    }

    getUserPosts(req: $Request, res: $Response): void {
        const username = req.params.username;
        let errorMsg : string = 'Unable to find user.';

        UserModels.userDb.findOne({
            where: {
                user_name: username,
                active: true,
            }
        }).then((user) => {
             if (!!user) {
                errorMsg = 'Unable to find posts.';
                PostModels.postDb.findAll({
                    where: {
                        submitter_user_id: user.id,
                        deleted: false,
                        found: false,
                    },
                    include: [
                        {
                            model: AttributeModels.attributeDb,
                            as: 'additional_attributes',
                            attributes: {exclude: ['id', 'post_id']},
                        },
                    ],
                }).then((data) => {
                    return res.status(200).json({
                        data
                    });
                }).catch((err) => {
                    logger.error(errorMsg, err, err.message);
                    return res.status(400).json({message: errorMsg});
                });
            } else {
                return res.status(404).json({
                    message: 'User does not exist.'
                });
            }
        }).catch((err) => {
            logger.error(errorMsg, err, err.message);
            return res.status(401).json({message: errorMsg});
        });

    }

    getLoggedInUserPosts(req: $Request, res: $Response): void {
        const errorMsg : string = 'Unable to find posts.';

        if (!!req.session.key) {
            PostModels.postDb.findAll({
                where: {
                    submitter_user_id: req.session.key['id'],
                    deleted: false,
                    found: false,
                },
                include: [
                    {
                        model: AttributeModels.attributeDb,
                        as: 'additional_attributes',
                        attributes: {exclude: ['id', 'post_id']},
                    },
                ],
            }).then((data) => {
                return res.status(200).json({
                    data
                });
            }).catch((err) => {
                logger.error(errorMsg, err, err.message);
                return res.status(400).json({message: errorMsg});
            });
        } else {
            return res.status(401).json({
                message: 'User not authenticated.'
            })
        }
    }

    deletePost(req: $Request, res: $Response): void {
        const postId = req.params.id;
        let errorMsg : string = 'Unable to delete post.';

        if (!!req.session.key) {
            PostModels.postDb.update({
                deleted: true,
            },{
                where: {
                    id: postId,
                    submitter_user_id: req.session.key['id'],
                },
                returns: true,
            }).then((data) => {
                if (data[0] > 0) {
                    return res.status(202).json({
                        message: 'Successfully deleted post.',
                    });
                } else {
                    return res.status(401).json({
                        message: 'User not authenticated.'
                    });
                }
            }).catch((err) => {
                logger.error(errorMsg, err, err.message);
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

    reverseGeocode(post: CreatePostParams, onComplete: (Object) => void) {
        return this.googleClient.reverseGeocode({
            latlng: [post.latitude, post.longitude],
        }, (error, data) => {
            post.city = 'Unknown';
            post.state = 'Unknown';
            post.country = 'Unknown';

            if (error === null && data.json.results.length !== 0) {
                const formattedAddress = data.json.results[0].formatted_address;

                post.formattedAddress = formattedAddress;

                const components = formattedAddress.split(',');
                const trimmedComponents = components.map((component) => component.trim());
                const length = trimmedComponents.length;

                if (length > 0) {
                    post.country = trimmedComponents[length - 1];
                }
                if (length > 1) {
                    post.state = trimmedComponents[length - 2];
                }
                if (length > 2) {
                    post.city = trimmedComponents[length - 3];
                }

            } else {
                const rawData = `Latitude (${post.latitude}), Longitude (${post.longitude})`;
                post.formattedAddress = rawData;
            }
            onComplete(post);
        });
    }

    createPost(req: $Request, res: $Response): void {
        const { body } = req;
        const params : CreatePostParams = {
            name: body.name,
            lastSeen: body.lastSeen,
            reward: body.reward,
            longitude: body.longitude,
            latitude: body.latitude,
            contact: body.contact,
            description: body.description,
            submitterUserId: req.session.key['id'],
        };
        if (params.longitude < -180 || params.longitude > 180 || params.latitude < -90 || params.latitude > 90) {
            return res.status(400).json({
                message: 'Invalid longitude-latitude combination.',
            });
        }
        this.reverseGeocode(params, (post) => {
            let errorMsg : string = 'Unable to create post.';
            if (!!req.session.key) {
                PostModels.postDb.create({
                    name: post.name,
                    last_seen: post.lastSeen,
                    reward: post.reward,
                    longitude: post.longitude,
                    latitude: post.latitude,
                    contact: post.contact,
                    city: post.city,
                    state: post.state,
                    country: post.country,
                    description: post.description,
                    formatted_address: post.formattedAddress,
                    submitter_user_id: post.submitterUserId,
                }).then((data) => {
                    const additionalAttributes = body.additionalAttributes.map((attr) => {
                        attr.post_id = data.id;
                        return attr;
                    });
                    AttributeModels.attributeDb.bulkCreate(additionalAttributes, {individualHooks: true})
                    .then((data) => {
                        return res.status(200).json({
                            message: 'Post created.',
                        });
                    }).catch((err) => {
                        logger.error(errorMsg, err, err.message);
                        return res.status(400).json({
                            message: errorMsg,
                            error: err.message,
                        });
                    });
                }).catch((err) => {
                    logger.error(errorMsg, err, err.message);
                    return res.status(400).json({
                        message: errorMsg,
                        error: err.message,
                    });
                })
            } else {
                return res.status(401).json({
                    message: 'User not authenticated.'
                })
            }
        });
    }

    editPost(req: $Request, res: $Response): void {
        const postId = req.params.id;
        const { body } = req;

        let errorMsg : string = 'Unable to edit post.';

        if (body.longitude < -180 || body.longitude > 180 || body.latitude < -90 || body.latitude > 90) {
            return res.status(400).json({
                message: 'Invalid longitude-latitude combination.',
            });
        }

        if (!!req.session.key) {
            PostModels.postDb.update({
                name: body.name,
                last_seen: body.lastSeen,
                reward: body.reward,
                longitude: body.longitude,
                latitude: body.latitude,
                contact: body.contact,
                description: body.description,
                formatted_address: body.formattedAddress,
            },{
                where: {
                    id: postId,
                    submitter_user_id: req.session.key['id'],
                },
                returns: true,
            }).then((data) => {
                if (data[0] > 0) {
                    return res.status(200).json({
                        message: 'Successfully edited post.',
                    });
                } else {
                    return res.status(401).json({
                        message: 'User not authenticated.'
                    });
                }
            }).catch((err) => {
                logger.error(errorMsg, err, err.message);
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

    markAsFound(req: $Request, res: $Response): void {
        const postId = req.params.id;
        const { body } = req;
        const username = body.username;

        if (!!req.session.key) {
            UserModels.userDb.findOne({
                where: {
                    user_name: username,
                    active: true,
                },
            }).then((data) => {
                let foundUserId = null;
                if (!!data) {
                    foundUserId = data.dataValues.id;
                } else {
                    return res.status(404).json({
                        message: 'Username not found.',
                    });
                }
                PostModels.postDb.update({
                    found: true,
                    found_user_id: foundUserId,
                },{
                    where: {
                        id: postId,
                        submitter_user_id: req.session.key['id'],
                        found: false,
                    },
                    returning: true,
                    plain: true,
                }).then((data) => {
                    console.log(data);
                    if (!!data && !!data[1].dataValues) {
                        return res.status(200).json({
                            message: 'Successfully marked as found.',
                        });
                    } else {
                        return res.status(500).json({
                            message: 'Internal server error.'
                        });
                    }
                }).catch((err) => {
                    return res.status(400).json({
                        message: 'User not authorized.',
                        error: err.message,
                    });
                });
            });
        } else {
            return res.status(401).json({
                message: 'User not authenticated.'
            });
        }
    }

}
