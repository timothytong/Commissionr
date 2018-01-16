// @ flow

'use strict';

import Logger from '../utils/Logger';
import { Router }  from 'express';
import UserModels from '../models/user';
import PostModels from '../models/post';
import bcrypt from 'bcryptjs';

type CreatePostParams = {
    id: integer,
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
    completed_shots: boolean,
    hasChip: boolean,
    found: boolean,
    foundUserId: integer,
    deleted: boolean,
    submitterUserId: integer,
};

const logger = new Logger();
const DB_ERROR = 'An error with the query has occurred.';

export default class PostRouter {
    // these fields must be type annotated, or Flow will complain!
    router: Router;
    path: string;

    // take the mount path as the constructor argument
    constructor(path = '/api/v1/post') {
        // instantiate the express.Router
        this.router = Router();
        this.path = path;
        // glue it all together
        this.init();
    }


    /**
    * Attach route handlers to their endpoints.
    */
    init(): void {
        this.router.post('/create', this.createPost);
        this.router.delete('/delete/:id', this.deletePost);
        this.router.post('/edit/:id', this.editPost);
        this.router.get('/userposts/:user_id', this.getUserPosts);
        this.router.get('/logged-in-userposts', this.getLoggedInUserPosts);
        this.router.get('/get/:id', this.getPost);

    }

    getPost(req: $Request, res: $Response): void {
        const postId = req.params.id;
        const errorMsg : string = 'Unable to find post.';

        PostModels.postDb.findOne({
            where: {
                id: postId,
            }
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
            return res.status(500).json({message: errorMsg});
        });
    }

    getUserPosts(req: $Request, res: $Response): void {
        const userId = req.params.user_id;
        const errorMsg : string = 'Unable to find posts.';

        PostModels.postDb.findAll({
            where: {
                submitter_user_id: userId,
            }
        }).then((data) => {
            return res.status(200).json({
                data
            });
        }).catch((err) => {
            logger.error(errorMsg, err, err.message);
            return res.status(400).json({message: errorMsg});
        });
    }

    getLoggedInUserPosts(req: $Request, res: $Response): void {
        const errorMsg : string = 'Unable to find posts.';

        if (!!req.session.key) {
            PostModels.postDb.findAll({
                where: {
                    submitter_user_id: req.session.key['id'],
                }
            }).then((data) => {
                return res.status(200).json({
                    data
                });
            }).catch((err) => {
                logger.error(errorMsg, err, err.message);
                return res.status(400).json({message: errorMsg});
            });
        } else {
            return res.status(500).json({
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
                    delete req.session.key;
                    return res.status(200).json({
                        message: 'Successfully deleted post.',
                    });
                } else {
                    return res.status(500).json({
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
            return res.status(500).json({
                message: 'User not authenticated.'
            })
        }
      
    }

    createPost(req: $Request, res: $Response): void {
        const { body } = req;
        const params : CreatePostParams = {
            id: body.id,
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
            found: body.found,
            foundUserId: body.foundUserId,
            deleted: body.deleted,
            submitterUserId: body.submitterUserId,
        };

        let errorMsg : string = 'Unable to create post.';

        if (params.longitude < -180 || params.longitude > 180 || params.latitude < -90 || params.latitude > 90) {
            return res.status(400).json({
                message: 'Invalid longitude-latitude combination.',
            });
        }

        if (!!req.session.key) {
            PostModels.postDb.create({
                id: params.id,
                name: params.name,
                last_seen: params.lastSeen,
                reward: params.reward,
                longitude: params.longitude,
                latitude: params.latitude,
                contact: params.contact,
                description: params.description,
                animal: params.animal,
                breed: params.breed,
                is_aggressive: params.isAggressive,
                completed_shots: params.completedShots,
                has_chip: params.hasChip,
                found: params.found,
                found_user_id: params.foundUserId,
                deleted: params.deleted,
                submitter_user_id: params.submitterUserId,
            }).then((data) => {
                return res.status(200).json({
                    message: 'Post created.',
                });
            }).catch((err) => {
                logger.error(errorMsg, err, err.message);
                return res.status(400).json({
                    message: errorMsg,
                    error: err.message,
                });
            })
        } else {
            return res.status(500).json({
                message: 'User not authenticated.'
            })
        }

    }

    editPost(req: $Request, res: $Response): void {
        const postId = req.params.id;
        const { body } = req;
        const params : UpdatePostParams = {
            name: body.name,
            last_aeen: body.lastSeen,
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
        };

        let errorMsg : string = 'Unable to edit post.';

        if (params.longitude < -180 || params.longitude > 180 || params.latitude < -90 || params.latitude > 90) {
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
            },{ 
                where: {
                    id: postId,
                    submitter_user_id: req.session.key['id'],
                },
                returns: true,
            }).then((data) => {
                if (data[0] > 0) { 
                    delete req.session.key;
                    return res.status(200).json({
                        message: 'Successfully edited post.',
                    });
                } else {
                    return res.status(500).json({
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
            return res.status(500).json({
                message: 'User not authenticated.'
            })
        }

    }

}
