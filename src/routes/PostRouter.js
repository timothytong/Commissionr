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
    animal: string,
    breed: string,
    isAggressive: boolean,
    completedShots: boolean,
    hasChip: boolean,
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
            if (error === null && data.json.results.length !== 0) {
                post.formattedAddress = data.json.results[0].formatted_address;
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
            animal: body.animal,
            breed: body.breed,
            isAggressive: body.isAggressive,
            completedShots: body.completedShots,
            hasChip: body.hasChip,
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
                    description: post.description,
                    animal: post.animal,
                    breed: post.breed,
                    is_aggressive: post.isAggressive,
                    completed_shots: post.completedShots,
                    has_chip: post.hasChip,
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
                animal: body.animal,
                breed: body.breed,
                is_aggressive: body.isAggressive,
                completed_shots: body.completedShots,
                has_chip: body.hasChip,
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

}
