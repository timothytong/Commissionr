import request from 'supertest';
import Api from '../../src/api';
import UserModels from '../../src/models/user';

const app = new Api().express;
const agent = request.agent(app);

describe('User Router Test.', () => {
    describe('POST /api/v1/user/create - create new user', () => {
        const uri = '/api/v1/user/create';

        it('Create new user.', (done) => {
            const body = {
                restaurantName:'glwasd',
                email:'glwasd@glw.com',
                phoneNumber:'6478672664',
                password:'abcd',
                streetAddress:'Fake Street 123',
                city:'toronto',
                postalCode:'M2H3Z5',
                province:'ON',
                country:'canada',
            };

            const cleanup = () => {
                UserModels.userDb.findOne({
                    where: {
                        phone_number: '6478672664',
                    },
                    attributes: ['id']
                }).then((data) => {
                    return UserModels.userDb.destroy({
                        where: {
                            id: data.id
                        }
                    });
                }).catch((err) => {
                    done.fail('Unable to cleanup test.\n' + err.message);
                });
            };

            request(app).post(uri).send(body).expect(200, {
                message: 'User created.',
            }).end((err, res) => {
                if (err) {
                    done.fail(err.message);
                } else {
                    cleanup();
                    done();
                }
            });
        });

        it('User exists.', (done) => {
            const body = {
                restaurantName:'glwasd',
                email:'glwasd@glw.com',
                phoneNumber:'5555555555',
                password:'abcd',
                streetAddress:'Fake Street 123',
                city:'toronto',
                postalCode:'M2H3Z5',
                province:'ON',
                country:'canada',
            };

            request(app).post(uri).send(body).expect(400, {
                message: 'phone number is already in use.',
                value: '5555555555'
            }).end((err, res) => {
                if (err) {
                    done.fail(err.message);
                } else {
                    done();
                }
            });
        });
    });

    describe('POST /api/v1/user/login - user login', () => {
        const uri = '/api/v1/user/login';

        it('Login and set cookie.', (done) => {
            agent.post(uri).send({
                phoneNumber: '4373458254',
                password: 'default1',
            }).expect(200).expect('set-cookie', /connect.sid/)
            .end((err, res) => {
                if (err) {
                    done.fail(err.message);
                }

                expect(res.body.message).toBe('User has been logged in.');

                return done();
            });
        });

        it('Missing password.', (done) => {
            agent.post(uri).send({
                phoneNumber: '4373458254',
            }).expect(400).end((err, res) => {
                if (err) {
                    done.fail(err.message);
                }

                expect(res.body.message)
                .toBe('Password and phone number / email are needed to login');

                done();
            });
        });

        it('Missing phone number and email.', (done) => {
            agent.post(uri).send({
                password: 'default1',
            }).expect(400).end((err, res) => {
                if (err) {
                    done.fail(err.message);
                }

                expect(res.body.message)
                .toBe('Password and phone number / email are needed to login');

                done();
            });
        });

        it('Invalid login.', (done) => {
            agent.post(uri).send({
                phoneNumber: 'invalid',
                password: 'invalid',
            }).expect(401).end((err, res) => {
                if (err) {
                    done.fail(err.message);
                }

                expect(res.body.message).toBe('Invalid login credentials.');

                done();
            });
        });
    });
});
