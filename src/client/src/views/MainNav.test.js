import React from 'react';
import { shallow } from 'enzyme';

import MainNav from './MainNav';

import { Link } from 'react-router-dom';

describe('<MainNav/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            ...overrides
        });

        component = shallow(<MainNav {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should be a nav and have an identifying class name', () => {
        expect(component.type()).toEqual('nav');
        expect(component.hasClass('main-nav')).toBe(true);
    });

    it('should have a link to the homepage', () => {
        const link = component.childAt(0);

        expect(link.type()).toEqual(Link);
        expect(link.props().to).toEqual('/');
        expect(link.childAt(0).text()).toEqual('Home');
    });
});

