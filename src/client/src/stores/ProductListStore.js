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
        return this.productList.map((item) =>
            ({
                id: item.id,
                imagePath: item.imageThumbUrl,
                name: item.name
            })
        );
    }

    getDisplayedProductDetails(id) {
        return this.productList.reduce((accumulator, item) => {
            if (item.id === id) {
                return {
                    id: item.id,
                    imagePath: item.imageUrl,
                    name: item.name,
                    price: item.price,
                    productPackage: item.productPackage,
                    style: item.style,
                    tastingNote: item.tastingNote
                };
            }

            return accumulator;
        }, null);
    }

    getProductName(id) {
        return this.productList.reduce((accumulator, item) => {
            if (item.id === id) {
                return item.name;
            }

            return accumulator;
        }, null);
    }

    @action
    setProducts(newProducts) {
        this.productList = newProducts.map((product) => ({
            id: product.id.toString(),
            imageUrl: product.image_url,
            imageThumbUrl: product.image_thumb_url,
            name: product.name,
            productPackage: product.package,
            price: product.price_in_cents / 100,
            style: product.style,
            tastingNote: product.tasting_note,
            varietal: product.varietal
        }));
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
