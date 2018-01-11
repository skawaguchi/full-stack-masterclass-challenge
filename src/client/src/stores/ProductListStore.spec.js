import sinon from 'sinon';

import { getAdaptedProduct, getProduct } from '../mockUtils';
import * as productRepository from '../repositories/Products';

import ProductListStore from './ProductListStore';

import { Stores } from './index';

jest.mock('./index');

const sandbox = sinon.sandbox.create();

describe('ProductListStore', () => {
    let store;
    let getProductsStub;
    let consoleStub;

    function makeStore() {
        store = new ProductListStore();
    }

    beforeEach(() => {
        getProductsStub = sandbox.stub(productRepository, 'getProducts');
        consoleStub = sandbox.stub(console, 'error');

        Stores.uiStore.pushLocation.mockImplementation(() => sandbox.stub());

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

    describe('Fetching and adapting data', () => {
        let productListMockData;
        let adaptedProduct;
        let originalProduct;

        beforeEach(() => {
            productListMockData = [
                getProduct()
            ];

            store.setProducts(productListMockData);

            /* eslint-disable prefer-destructuring */
            adaptedProduct = store.productList[0];
            originalProduct = productListMockData[0];
            /* eslint-enable */
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

        it('should set the product list and adapt the necessary values', () => {
            expect(store.productList).toHaveLength(productListMockData.length);
        });

        it('should adapt the product values', () => {
            expect(adaptedProduct.id).toEqual(originalProduct.id.toString());
            expect(adaptedProduct.name).toEqual(originalProduct.name);
            expect(adaptedProduct.price).toEqual(originalProduct.price_in_cents / 100);
        });

        it('should adapt the image values', () => {
            expect(adaptedProduct.imageUrl).toEqual(originalProduct.image_url);
            expect(adaptedProduct.imageThumbUrl).toEqual(originalProduct.image_thumb_url);
        });

        it('should adapt the product detail values', () => {
            expect(store.productList).toHaveLength(productListMockData.length);
            expect(adaptedProduct.productPackage).toEqual(originalProduct.package);
            expect(adaptedProduct.style).toEqual(originalProduct.style);
            expect(adaptedProduct.tastingNote).toEqual(originalProduct.tasting_note);
            expect(adaptedProduct.varietal).toEqual(originalProduct.varietal);
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

                getProductsStub.returns(Promise.resolve(expectedResults));

                await store.fetchProducts();

                const displayedItem = store.displayedProductList[0];

                expect(displayedItem.id).toEqual(productMock.id.toString());
                expect(displayedItem.imagePath).toEqual(productMock.image_thumb_url);
                expect(displayedItem.name).toEqual(productMock.name);
                expect(store.displayedProductList.length).toEqual(expectedResults.data.result.length);
            });
        });

        describe('When fetching the products fails', () => {
            it('should log the error and go to the error page', async () => {
                const expectedError = 'some error';

                getProductsStub.returns(Promise.reject(expectedError));

                await store.fetchProducts();

                const expectedLocation = {
                    pathname: '/error'
                };

                expect(Stores.uiStore.pushLocation).toBeCalledWith(expectedLocation);

                sinon.assert.calledOnce(consoleStub);
            });
        });
    });

    describe('Accessing view-specific values', () => {
        let productListMockData;

        beforeEach(() => {
            productListMockData = [
                getAdaptedProduct(),
                getAdaptedProduct(),
                getAdaptedProduct()
            ];

            store.productList = productListMockData;
        });

        it('should get the adapted product list items', () => {
            const displayedList = store.displayedProductList;
            const expectedAttributes = [
                { adapted: 'id', original: 'id' },
                { adapted: 'imagePath', original: 'imageThumbUrl' },
                { adapted: 'name', original: 'name' }
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
            const firstProductId = firstProduct.id;
            const displayedDetails = store.getDisplayedProductDetails(firstProductId);

            const expectedAttributes = [
                { adapted: 'id', original: 'id' },
                { adapted: 'imagePath', original: 'imageUrl' },
                { adapted: 'name', original: 'name' },
                { adapted: 'productPackage', original: 'productPackage' },
                { adapted: 'price', original: 'price' },
                { adapted: 'style', original: 'style' },
                { adapted: 'tastingNote', original: 'tastingNote' }
            ];

            expectedAttributes.forEach((attrMap) => {
                const adaptedValue = displayedDetails[attrMap.adapted];
                const originalValue = firstProduct[attrMap.original];

                expect(adaptedValue).toEqual((originalValue));
            });

            const detailsKeys = Object.keys(displayedDetails);

            expect(detailsKeys).toHaveLength(expectedAttributes.length);
        });

        it('should get the product name', () => {
            const target = productListMockData[1];
            const productId = target.id;
            const productName = store.getProductName(productId);
            const expectedValue = target.name;

            expect(productName).toEqual(expectedValue);
        });
    });
});
