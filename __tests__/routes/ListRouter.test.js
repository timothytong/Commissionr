import request from 'supertest';
import Api from '../../src/api';

const app = new Api().express;
const agent = request.agent(app);

describe('List Router Test.', () => {
    beforeEach((done) => {
        agent.post('/api/v1/user/login').send({
            phoneNumber: '4373458254',
            password: 'default1'
        }).expect(200).expect('set-cookie', /connect.sid/).end((err, res) => {
            if (err) {
                done.fail(err.message);
            }

            done();
        });
    });

    describe('GET /api/v1/list - get all lists', () => {
        const uri = '/api/v1/list';

        it('Should return all lists belonging to user.', (done) => {
            agent.get(uri).expect(200).end((err, res) => {
                if (err) {
                    done.fail(err.message);
                } else {
                    try {
                        let lists = res.body.lists;

                        expect(lists.length).toBe(1);
                        lists.forEach((list) => {
                            expect(list.product_lists.length).toBe(6);
                        });

                        done();
                    } catch (error) {
                        done.fail(error.message);
                    };
                }
            });
        });
    });
});
