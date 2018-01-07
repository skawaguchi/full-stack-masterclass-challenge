import React from 'react';
import { shallow } from 'enzyme';

import ProductDetails from './ProductDetails';

import AppContainer from './AppContainer';
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
            expect(component.type()).toEqual(AppContainer);
        });

        it('should have product details content', () => {
            const content = component.find(ProductDetailsContent);

            expect(content).toHaveLength(1);
        });
    });
});

