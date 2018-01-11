import { Stores } from './index';
import ProductListStore from './ProductListStore';
import StoreListStore from './StoreListStore';
import UIStore from './UIStore';

describe('Stores', () => {
    it('should have a product list store', () => {
        expect(Stores.productListStore instanceof ProductListStore).toEqual(true);
    });

    it('should have an lcbo store list store', () => {
        expect(Stores.storeListStore instanceof StoreListStore).toEqual(true);
    });

    it('should have a store for the ui', () => {
        expect(Stores.uiStore instanceof UIStore).toEqual(true);
    });
});
