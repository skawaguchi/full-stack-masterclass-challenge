import React from 'react';
import { shallow } from 'enzyme';

import Error from './Error';

describe('<Error/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            ...overrides
        });

        component = shallow(<Error {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should be a section', () => {
        expect(component.type()).toEqual('section');
        expect(component.hasClass('error')).toBe(true);
    });
});

