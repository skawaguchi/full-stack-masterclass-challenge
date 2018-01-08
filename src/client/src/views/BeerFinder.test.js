import React from 'react';
import { shallow } from 'enzyme';

import BeerFinder from './BeerFinder';

import ProductListContainer from './ProductListContainer';
import BeerFinderContent from './beer-finder/BeerFinderContent';

describe('<BeerFinder/>', () => {
    let component;
    let productIdMock;

    function renderComponent() {
        const match = {
            params: {
                productId: productIdMock
            }
        };

        component = shallow(<BeerFinder match={ match }/>);
    }

    beforeEach(() => {
        productIdMock = 'someId';

        renderComponent();
    });

    it('should ensure the products are loaded', () => {
        expect(component.type()).toEqual(ProductListContainer);
    });

    it('should have content', () => {
        const content = component.find(BeerFinderContent);

        expect(content.props().productId).toEqual(productIdMock);
    });
});

