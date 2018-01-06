import {
    action,
    computed,
    observable
} from 'mobx';

import { getProducts } from '../repositories/Products';

class ProductListStore {
    @observable productList = [];

    @computed get displayedProductList() {
        return this.productList.map(({
            id,
            image_thumb_url,
            name,
            product_number
        }) =>
            ({
                id,
                imagePath: image_thumb_url,
                name,
                productNumber: product_number
            })
        );
    }

    @action setProducts(newProducts) {
        this.productList = newProducts;
    }

    @action async fetchProducts() {
        try {
            const products = await getProducts();

            this.setProducts(products.data.result);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default ProductListStore;
