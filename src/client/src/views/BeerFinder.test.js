import React from 'react';
import { shallow } from 'enzyme';

import BeerFinder from './BeerFinder';

import AppContainer from './AppContainer';
import CloseLink from '../components/CloseLink';

describe('<BeerFinder/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            ...overrides
        });

        component = shallow(<BeerFinder {...props}/>);
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
        expect(container.hasClass('beer-finder')).toBe(true);
    });

    it('should have a close link', () => {
        expect(component.find(CloseLink)).toHaveLength(1);
    });
});

