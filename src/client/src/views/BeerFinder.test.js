import React from 'react';
import { shallow } from 'enzyme';

import BeerFinder from './BeerFinder';

import ProductListContainer from './ProductListContainer';
import StoreListContainer from './StoreListContainer';
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

    it('should ensure the stores are loaded', () => {
        const container = component.find(StoreListContainer);

        expect(container.props().productId).toEqual(productIdMock);
    });

    it('should have content', () => {
        const content = component.find(BeerFinderContent);

        expect(content.props().productId).toEqual(productIdMock);
    });
});

