import React from 'react';
import { shallow } from 'enzyme';

import ProductDetails from './ProductDetails';

import AppContainer from './AppContainer';
import CloseLink from '../components/CloseLink';

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

    it('should ensure the products are loaded', () => {
        expect(component.type()).toEqual(AppContainer);
    });

    it('should have a container element', () => {
        const container = component.childAt(0);

        expect(container.type()).toEqual('section');
        expect(container.hasClass('product-details')).toBe(true);
    });

    it('should have a close link', () => {
        expect(component.find(CloseLink)).toHaveLength(1);
    });
});

