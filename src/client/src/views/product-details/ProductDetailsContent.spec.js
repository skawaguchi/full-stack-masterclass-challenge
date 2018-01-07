import React from 'react';
import { shallow } from 'enzyme';

import ProductDetailsContent from './ProductDetailsContent';

import CloseLink from '../../components/CloseLink';
import ProductImage from '../../components/ProductImage';

import { Stores } from '../../stores/index';

import { getAdaptedProduct } from '../../mockUtils';

describe('<ProductDetailsContent/>', () => {
    let component;
    let store;
    let productMock;

    function renderWrappedComponent() {
        const storeMock = {
            fetchProducts: () => {},
            getDisplayedProductDetails: () => productMock,
            displayedProductList: [productMock]
        };

        component = shallow(
            <ProductDetailsContent
                id={ productMock.id }
                productListStore={ storeMock }
            />
        ).dive();
    }

    beforeEach(() => {
        store = Stores.productListStore;
    });

    describe.only('Given products are loaded', () => {
        beforeEach(() => {
            productMock = getAdaptedProduct();

            store.productList = [
                productMock
            ];

            renderWrappedComponent();
        });

        it('should have a container element', () => {
            expect(component.type()).toEqual('section');
            expect(component.hasClass('product-details')).toBe(true);
        });

        it('should have a close link', () => {
            expect(component.find(CloseLink)).toHaveLength(1);
        });

        it('should have a product image', () => {
            const image = component.find(ProductImage);

            expect(image.props().altText).toEqual(productMock.name);
            expect(image.props().imagePath).toEqual(productMock.imagePath);
        });
    });
});
