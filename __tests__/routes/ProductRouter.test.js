import request from 'supertest';
import encodeUrl from 'encodeurl';
import Api from '../../src/api';

const app = new Api().express;

describe('Product Router Test', () => {
    beforeEach(function() {
        jasmine.addMatchers({
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
            },
            toBeNullOrNumber: () => {
                return {
                    compare: (actual) => {
                        let isNullOrNumber = typeof actual === 'number'
                        || actual === null;

                        return {
                            pass: isNullOrNumber,
                            message: 'Item is not null or number.'
                        };
                    }
                };
            }
        });
    });

    describe('POST /api/v1/product - get products that match name', () => {
        const uri = '/api/v1/product';

        it('should return all products', (done) => {
            let body = {
                item: 'chicken',
            };

            request(app).post(uri).send(body).expect(200).end((err, res) => {
                if (err) {
                    done.fail(err.message);
                } else {
                    try {
                        let products = res.body.product;

                        expect(products.length).toBe(2);
                        products.forEach((product) => {
                            expect(typeof product.sku).toBe('string');
                            expect(product.en_item_name).toBeNullOrString();
                            expect(product.cn_item_name).toBeNullOrString();
                            expect(product.img).toBeNullOrString();
                            expect(product.brand).toBeNullOrString();
                            expect(product.vendor).toBeNullOrString();
                            expect(product.product_tab).toBeNullOrString();
                            expect(product.description).toBeNullOrString();
                            expect(product.featured).toBeNullOrNumber();
                            expect(product.is_removed).toBe(false);
                        });

                        done();
                    } catch (error) {
                        done.fail(error.message);
                    };
                }
            });
        });
    });

    describe('GET /api/v1/product/:main/:sub - get products from category', () => {
        const uri = encodeUrl('/api/v1/product/meat,肉禽类/Chicken,鸡肉');

        it('should return all products from category', (done) => {
            request(app).get(uri).expect(200).end((err, res) => {
                if (err) {
                    done.fail(err.message);
                } else {
                    try {
                        let products = res.body.product;

                        expect(products.length).toBe(2);
                        products.forEach((product) => {
                            expect(typeof product.sku).toBe('string');
                            expect(product.en_item_name).toBeNullOrString();
                            expect(product.cn_item_name).toBeNullOrString();
                            expect(product.img).toBeNullOrString();
                            expect(product.brand).toBeNullOrString();
                            expect(product.vendor).toBeNullOrString();
                            expect(product.product_tab).toBeNullOrString();
                            expect(product.description).toBeNullOrString();
                            expect(product.featured).toBeNullOrNumber();
                            expect(product.is_removed).toBe(false);
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
