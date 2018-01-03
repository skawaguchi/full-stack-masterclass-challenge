import { ProductListStore } from './ProductListStore';

import {
    getProduct
} from '../mockUtils';

describe('ProductListStore', () => {
    let store;

    function makeStore() {
        store = new ProductListStore();
    }

    beforeEach(() => {
        makeStore();
    });

    describe('Initialization', () => {
        it('should default the product list to empty', () => {
            expect(store.productList).toHaveLength(0);
        });
    });

    describe('Methods', () => {
        let productListMockData;

        beforeEach(() => {
            productListMockData = [
                getProduct(),
                getProduct(),
                getProduct()
            ];

            store.setProducts(productListMockData);
        });

        it('should get the displayed product list item', () => {
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
    });
});
