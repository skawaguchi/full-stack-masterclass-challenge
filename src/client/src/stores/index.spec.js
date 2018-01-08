import { Stores } from './index';
import { ProductListStore } from './ProductListStore';
import { StoreListStore } from './StoreListStore';

describe('Stores', () => {
    it('should have a product list store', () => {
        expect(Stores.productList).toEqual(ProductListStore);
    });

    it('should have an lcbo store list store', () => {
        expect(Stores.storeList).toEqual(StoreListStore);
    });
});
