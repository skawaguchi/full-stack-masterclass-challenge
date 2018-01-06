import React from 'react';
import { shallow } from 'enzyme';

import Loader from './Loader';

describe('<Loader/>', () => {
    let component;

    function renderComponent() {
        component = shallow(<Loader/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should have a containing div with an identifying class name', () => {
        expect(component.type()).toEqual('div');
        expect(component.hasClass('loader')).toBe(true);
    });

    it('should have the loading animation', () => {
        const image = component.find('img');

        expect(image.type()).toEqual('img');
        expect(image.props().alt).toEqual('Loading...');
        expect(image.props().src).toEqual('/loading.gif');
    });
});

