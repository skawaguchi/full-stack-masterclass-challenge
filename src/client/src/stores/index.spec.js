import { Stores } from './index';
import { ProductListStore } from './ProductListStore';

describe('Stores', () => {
    it('should have a product list store', () => {
        expect(Stores.productList).toEqual(ProductListStore);
    });
});
