import { action, computed, observable } from 'mobx';

export class ProductListStore {
    productList = [];

    @computed get displayedProductList() {
        return this.productList.map(({
            id,
            image_thumb_url,
            name,
            product_number
        }) => {
            return {
                id,
                image_thumb_url,
                name,
                product_number
            };
        });
    }

    @action setProducts(newProducts) {
        this.productList = newProducts;
    }
}
