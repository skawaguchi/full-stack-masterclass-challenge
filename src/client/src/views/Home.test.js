import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

describe('<Home/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            ...overrides
        });

        component = shallow(<Home {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should be a section', () => {
        expect(component.type()).toEqual('section');
        expect(component.hasClass('home')).toBe(true);
    });
});

