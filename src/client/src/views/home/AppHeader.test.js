import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import AppHeader from './AppHeader';

const sandbox = sinon.sandbox.create();

describe('<AppHeader/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            onHomeClicked: sandbox.stub(),
            ...overrides
        });

        component = shallow(<AppHeader {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should be a header', () => {
        expect(component.type()).toEqual('header');
    });

    it('should have the company logo', () => {
        const logo = component.find('img');

        expect(logo.props().src).toEqual('/beaus-beige-logo.svg');
        expect(logo.hasClass('logo')).toBe(true);
        expect(logo.props().alt).toEqual('Beau\'s Logo');
    });
});

