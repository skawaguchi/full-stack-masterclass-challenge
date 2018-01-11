import ProductListStore from './ProductListStore';
import StoreListStore from './StoreListStore';
import UIStore from './UIStore';

export const Stores = {
    productListStore: new ProductListStore(),
    storeListStore: new StoreListStore(),
    uiStore: new UIStore()
};
