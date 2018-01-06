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

        it('should get the adapted product list items', () => {
            const displayedList = store.displayedProductList;
            const expectedAttributes = [
                { adapted: 'imagePath', original: 'image_thumb_url' },
                { adapted: 'name', original: 'name' },
                { adapted: 'productNumber', original: 'product_no' }
            ];

            displayedList.forEach((item, index) => {
                expectedAttributes.forEach((attrMap) => {
                    const adaptedValue = item[attrMap.adapted];
                    const originalItem = productListMockData[index];
                    const originalValue = originalItem[attrMap.original];

                    expect(adaptedValue).toEqual(originalValue);
                });

                const itemKeys = Object.keys(item);

                expect(itemKeys).toHaveLength(expectedAttributes.length);
            });
        });

        it('should get the adapted product list details', () => {
            const firstProduct = productListMockData[0];
            const firstProductNumber = firstProduct.product_no;
            const displayedDetails = store.getDisplayedProductDetails(firstProductNumber);

            const expectedAttributes = [
                { adapted: 'imagePath', original: 'image_url' },
                { adapted: 'name', original: 'name' },
                { adapted: 'productPackage', original: 'package' },
                { adapted: 'price', original: 'price_in_cents' },
                { adapted: 'productNumber', original: 'product_no' },
                { adapted: 'style', original: 'style' },
                { adapted: 'tastingNote', original: 'tasting_note' }
            ];

            expectedAttributes.forEach((attrMap) => {
                const adaptedValue = displayedDetails[attrMap.adapted];
                const originalValue = firstProduct[attrMap.original];

                expect(adaptedValue).toEqual(originalValue);
            });

            const detailsKeys = Object.keys(displayedDetails);

            expect(detailsKeys).toHaveLength(expectedAttributes.length);
        });

        it('should set the product list', () => {
            expect(store.productList).toHaveLength(productListMockData.length);
        });

        it('should fetch the products', () => {
            getProductsStub.returns(Promise.resolve({
                data: {
                    result: [
                        getProduct()
                    ]
                }
            }));

            store.fetchProducts();

            sinon.assert.calledOnce(getProductsStub);
        });

        describe('When fetching the products is successful', () => {
            it('should update the store with the fetched products', async () => {
                const productMock = getProduct();
                const expectedResults = {
                    data: {
                        result: [
                            productMock
                        ]
                    }
                };

                getProductsStub
                    .returns(Promise.resolve(expectedResults));

                await store.fetchProducts();

                const displayedItem = store.displayedProductList[0];

                expect(displayedItem.imagePath).toEqual(productMock.image_thumb_url);
                expect(displayedItem.name).toEqual(productMock.name);
                expect(displayedItem.productNumber).toEqual(productMock.product_no);
                expect(store.displayedProductList.length).toEqual(expectedResults.data.result.length);
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
