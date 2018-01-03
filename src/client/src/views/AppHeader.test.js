import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import AppHeader from './AppHeader';

import MainNav from './MainNav';

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

    it('should have a main nav', () => {
        const nav = component.find(MainNav);

        expect(nav).toHaveLength(1);
    });
});

