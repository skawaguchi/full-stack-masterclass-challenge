import React from 'react';
import { shallow } from 'enzyme';

import NotFound from './NotFound';

describe('<NotFound/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            ...overrides
        });

        component = shallow(<NotFound {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should be a section', () => {
        expect(component.type()).toEqual('section');
        expect(component.hasClass('not-found')).toBe(true);
    });
});

