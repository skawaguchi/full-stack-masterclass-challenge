import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/fontawesome-free-solid';

import BeerFinderLink from './BeerFinderLink';

describe('<BeerFinderLink/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            productNumber: 'someProductNumber',
            ...overrides
        });

        component = shallow(<BeerFinderLink {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });
    it('should be a react router link and have an identifying class name', () => {
        expect(component.type()).toEqual(Link);
        expect(component.hasClass('beer-finder-link')).toBe(true);
    });

    it('should link to the beer finder details view', () => {
        expect(component.props().to).toEqual(`/product/${props.productNumber}/beer-finder`);
    });

    it('should have an icon', () => {
        const icon = component.find(FontAwesomeIcon);

        expect(icon.props().icon).toEqual(faMapMarker);
    });
});

