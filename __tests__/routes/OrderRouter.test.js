import request from 'supertest';
import Api from '../../src/api';

const app = new Api().express;

describe('Order Router Test.', () => {
    beforeEach(() => {
        jasmine.addMatchers({
            toBeSorted: () => {
                return {
                    compare: (actual) => {
                        let expected = actual.slice().sort((a, b) => {
                            return b.id - a.id;
                        });

                        return {
                            pass: jasmine.matchersUtil.equals(actual, expected),
                            message: 'Orders not sorted by ID in descending order.'
                        };
                    }
                };
            },
            toBeNullOrString: () => {
                return {
                    compare: (actual) => {
                        let isNullOrString = typeof actual === 'string'
                        || actual === null;

                        return {
                            pass: isNullOrString,
                            message: 'Item is not null or string.'
                        };
                    }
                };
            }
        });
    });

    describe('GET /api/v1/order/fetch - get all orders', () => {
        const uri = '/api/v1/order/fetch';

        it('Should return all orders.', (done) => {
            request(app).get(uri).query({
                startDate: new Date('2013-11-18 11:55'),
                endDate: new Date('2018-11-12 11:55'),
            }).expect(200).end((err, res) => {
                if (err) {
                    done.fail(err.message);
                } else {
                    try {
                        let orders = res.body.orders;

                        expect(orders.length).toBe(5);
                        expect(orders).toBeSorted();

                        orders.forEach((order) => {
                            expect(typeof order.id).toBe('number');
                            expect(typeof order.created_at).toBe('string');
                            expect(typeof order.updated_at).toBe('string');
                            expect(order.estimated_delivery).toBeNullOrString();
                            expect(typeof order.delivery_time).toBe('string');
                            expect(typeof order.status).toBe('string');
                            expect(typeof order.paid).toBe('boolean');
                            expect(typeof order.product_receipts).toBe('object');
                            expect(typeof order.subtotal).toBe('string');
                            expect(typeof order.delivery_fee).toBe('string');
                            expect(typeof order.total).toBe('string');
                            expect(typeof order.user_address_id).toBe('number');
                            expect(typeof order.user_address).toBe('object');
                        });

                        done();
                    } catch(error) {
                        done.fail(error);
                    };
                }
            });
        });
    });
});
