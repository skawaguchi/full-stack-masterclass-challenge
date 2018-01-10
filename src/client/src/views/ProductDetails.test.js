import React from 'react';
import { shallow } from 'enzyme';

import ProductDetails from './ProductDetails';

import ProductListContainer from '../containers/ProductListContainer';
import ProductDetailsContent from './product-details/ProductDetailsContent';

describe('<ProductDetails/>', () => {
    let component;
    let productIdMock;

    function renderComponent() {
        const match = {
            params: {
                productId: productIdMock
            }
        };

        component = shallow(<ProductDetails match={ match }/>);
    }

    describe('Given products are loaded', () => {
        beforeEach(() => {
            productIdMock = 'someId';

            renderComponent();
        });

        it('should ensure the products are loaded', () => {
            expect(component.type()).toEqual(ProductListContainer);
        });

        it('should have product details content', () => {
            const content = component.find(ProductDetailsContent);

            expect(content.props().productId).toEqual(productIdMock);
        });
    });
});

