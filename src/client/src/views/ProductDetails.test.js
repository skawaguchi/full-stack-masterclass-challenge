import React from 'react';
import { shallow } from 'enzyme';

import ProductDetails from './ProductDetails';

describe('<ProductDetails/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            ...overrides
        });

        component = shallow(<ProductDetails {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should have a container element', () => {
        expect(component.type()).toEqual('section');
        expect(component.hasClass('product-details')).toBe(true);
    });
});

