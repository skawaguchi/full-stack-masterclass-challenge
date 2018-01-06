import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import Home from './Home';

import ProductList from './ProductList';

import { Stores } from '../stores/index';

const sandbox = sinon.sandbox.create();

describe('<Home/>', () => {
    let component;
    let store;

    function renderMountedComponent() {
        store = Stores.productListStore;

        sandbox.stub(store, 'fetchProducts');

        component = mount(
            <Home productListStore={ store }/>
        );
    }

    function renderWrappedComponent() {
        store = Stores.productListStore;

        sandbox.stub(store, 'fetchProducts');

        component = shallow(
            <Home productListStore={ store }/>
        ).dive();
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

        it('should have the product list', () => {
            const list = component.find(ProductList);

            expect(list.props().productListItems).toEqual(store.displayedProductList);
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
