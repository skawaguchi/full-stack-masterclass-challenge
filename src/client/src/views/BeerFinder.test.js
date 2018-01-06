import React from 'react';
import { shallow } from 'enzyme';

import BeerFinder from './BeerFinder';

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

    it('should have a container element', () => {
        expect(component.type()).toEqual('section');
        expect(component.hasClass('beer-finder')).toBe(true);
    });

    it('should have a close link', () => {
        expect(component.find(CloseLink)).toHaveLength(1);
    });
});

