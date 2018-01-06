import {
    action,
    computed,
    observable
} from 'mobx';

import { getProducts } from '../repositories/Products';

class ProductListStore {
    @observable productList = [];

    @computed
    get displayedProductList() {
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

    getDisplayedProductDetails(productNumber) {
        return this.productList.reduce((accumulator, item) => {
            if (item.product_no === productNumber) {
                return {
                    imagePath: item.image_url,
                    name: item.name,
                    price: item.price_in_cents,
                    productNumber: item.product_no,
                    productPackage: item.package,
                    style: item.style,
                    tastingNote: item.tasting_note
                };
            }

            return accumulator;
        }, null);
    }

    @action
    setProducts(newProducts) {
        this.productList = newProducts;
    }

    @action
    async fetchProducts() {
        try {
            const products = await getProducts();

            this.setProducts(products.data.result);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default ProductListStore;
