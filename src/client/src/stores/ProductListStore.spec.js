import sinon from 'sinon';

import ProductListStore from './ProductListStore';

import { getProduct } from '../mockUtils';
import * as productRepository from '../repositories/Products';

const sandbox = sinon.sandbox.create();

describe('ProductListStore', () => {
    let store;

    function makeStore() {
        store = new ProductListStore();
    }

    beforeEach(() => {
        makeStore();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Initialization', () => {
        it('should default the product list to empty', () => {
            expect(store.productList).toHaveLength(0);
        });
    });

    describe('Methods', () => {
        let productListMockData;
        let getProductsStub;

        beforeEach(() => {
            getProductsStub = sandbox.stub(productRepository, 'getProducts');

            productListMockData = [
                getProduct(),
                getProduct(),
                getProduct()
            ];

            store.setProducts(productListMockData);
        });

        it('should get the adapted product list items for display', () => {
            const displayedList = store.displayedProductList;
            const expectedAttributes = [
                'id',
                'image_thumb_url',
                'name',
                'product_number'
            ];
            const excludedAttributes = [
                'description',
                'price_in_cents',
                'primary_category',
                'secondary_category',
                'style',
                'tertiary_category',
                'varietal'
            ];

            displayedList.forEach((item) => {
                expectedAttributes.forEach((attribute) => {
                    expect(item[attribute]).not.toBe(undefined);
                });
                excludedAttributes.forEach((attribute) => {
                    expect(item[attribute]).toBe(undefined);
                });
            });
        });

        it('should set the product list', () => {
            expect(store.productList).toHaveLength(productListMockData.length);
        });

        it('should fetch the products', () => {
            store.fetchProducts();

            sinon.assert.calledOnce(getProductsStub);
        });

        describe('When fetching the products is successful', () => {
            it('should update the store with the fetched products', async () => {
                const expectedResults = [
                    getProduct()
                ];

                getProductsStub
                    .returns(Promise.resolve(expectedResults));

                await store.fetchProducts();

                expect(store.displayedProductList).toHaveLength(expectedResults.length);
            });
        });

        describe('When fetching the products fails', () => {
            it('should throw an error', async () => {
                expect.assertions(1);

                const expectedError = 'some error';

                getProductsStub
                    .returns(Promise.reject(expectedError));

                try {
                    await store.fetchProducts();
                } catch (err) {
                    expect(err).toEqual(new Error(expectedError));
                }
            });
        });
    });
});
