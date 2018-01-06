import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

import CloseLink from './CloseLink';

describe('<CloseLink/>', () => {
    let component;

    function renderComponent() {
        component = shallow(<CloseLink/>);
    }

    beforeEach(() => {
        renderComponent();
    });
    it('should be a react router link with a class name for styling', () => {
        expect(component.type()).toEqual(Link);
        expect(component.hasClass('close-link')).toBe(true);
    });

    it('should link to the home view', () => {
        expect(component.props().to).toEqual('/');
    });

    it('should have an icon', () => {
        const icon = component.find(FontAwesomeIcon);

        expect(icon.props().icon).toEqual(faTimes);
    });
});

