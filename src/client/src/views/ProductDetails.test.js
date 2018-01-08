import React from 'react';
import { shallow } from 'enzyme';

import ProductDetails from './ProductDetails';

import ProductListContainer from './ProductListContainer';
import ProductDetailsContent from './product-details/ProductDetailsContent';

describe('<ProductDetails/>', () => {
    let component;

    function renderComponent() {
        const match = {
            params: {
                productId: 'someId'
            }
        };

        component = shallow(<ProductDetails match={ match }/>);
    }

    describe('Given products are loaded', () => {
        beforeEach(() => {
            renderComponent();
        });

        it('should ensure the products are loaded', () => {
            expect(component.type()).toEqual(ProductListContainer);
        });

        it('should have product details content', () => {
            const content = component.find(ProductDetailsContent);

            expect(content).toHaveLength(1);
        });
    });
});

