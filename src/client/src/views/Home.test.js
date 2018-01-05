import React from 'react';
import { mount, shallow } from 'enzyme';
import { Stores } from '../stores/index';
import sinon from 'sinon';

import Home from './Home';

const sandbox = sinon.sandbox.create();

describe('<Home/>', () => {
    let component;
    let props;
    let store;

    function renderMountedComponent() {
        store = Stores.productListStore;

        sandbox.stub(store, 'fetchProducts');

        component = mount(
            <Home productListStore={ store }/>
        );
    }

    function renderWrappedComponent(overrides) {
        props = Object.freeze({
            ...overrides
        });

        component = shallow(
            <Home.wrappedComponent/>,
            {
                disableLifecycleMethods: true
            }
        );
    }

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given the component renders', () => {
        beforeEach(() => {
            renderWrappedComponent();
        });

        it('should be a section', () => {
            expect(component.type()).toEqual('section');
            expect(component.hasClass('home')).toBe(true);
        });
    });

    describe('Given the component is rendered with a store', () => {
        beforeEach(() => {
            renderMountedComponent();
        });

        describe('When the component mounts', () => {
            it('should load the product list', () => {
                sinon.assert.calledOnce(store.fetchProducts);
            });
        });
    });
});
