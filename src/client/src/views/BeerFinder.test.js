import React from 'react';
import { shallow } from 'enzyme';

import BeerFinder from './BeerFinder';

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
});

