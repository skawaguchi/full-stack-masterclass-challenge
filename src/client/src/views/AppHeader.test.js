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

    it('should have a link to the homepage', () => {
        const link = component.find('a.home-link');

        expect(link).toHaveLength(1);
        expect(link.text()).toEqual('Home');
    });

    describe('when the home link is clicked', () => {
        it('should call the home callback', () => {
            const link = component.find('.home-link');

            link.simulate('click');

            sinon.assert.calledOnce(props.onHomeClicked);
        });
    });
});

