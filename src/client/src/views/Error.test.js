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
        expect(component.hasClass('error-view')).toBe(true);
    });

    it('should have an error image', () => {
        const image = component.find('img');

        expect(image).toHaveLength(1);
    });

    it('should have an error message', () => {
        const image = component.find('p');

        expect(image).toHaveLength(1);
    });
});

