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
            image_thumb_url,
            name,
            product_no
        }) =>
            ({
                imagePath: image_thumb_url,
                name,
                productNumber: product_no
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
