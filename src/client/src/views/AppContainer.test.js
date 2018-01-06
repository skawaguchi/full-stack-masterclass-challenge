import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router';

import AppContainer from './AppContainer';

import Loader from '../components/Loader';

import { Stores } from '../stores/index';

import { getMockReactClass } from '../mockUtils';

const sandbox = sinon.sandbox.create();

describe('<AppContainer/>', () => {
    let component;
    let store;
    let MockReactClass;

    function renderMountedComponent() {
        component = mount(
            <MemoryRouter>
                <AppContainer productListStore={ store }>
                    <MockReactClass/>
                </AppContainer>
            </MemoryRouter>
        );
    }

    function renderWrappedComponent() {
        component = shallow(
            <AppContainer productListStore={ store }>
                <MockReactClass/>
            </AppContainer>
        ).dive();
    }

    beforeEach(() => {
        store = Stores.productListStore;

        sandbox.stub(store, 'fetchProducts');

        MockReactClass = getMockReactClass();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given the component renders', () => {
        describe('and there are no products', () => {
            it('should show the loader', () => {
                store.productList = [];

                renderWrappedComponent();

                expect(component.type()).toEqual(Loader);
            });
        });
        describe('and there are products', () => {
            it('should render children', () => {
                store.productList = [{}];

                renderWrappedComponent();

                expect(component.type()).toEqual(MockReactClass);
            });
        });
    });

    describe('Given the component is rendered with a store', () => {
        describe('and there are no products', () => {
            describe('when the component mounts', () => {
                it('should load the product list', () => {
                    store.productList = [];

                    renderMountedComponent();

                    sinon.assert.calledOnce(store.fetchProducts);
                });
            });
        });

        describe('and there are products', () => {
            describe('when the component mounts', () => {
                it('should not load the product list', () => {
                    store.productList = [{}];

                    renderMountedComponent();

                    sinon.assert.notCalled(store.fetchProducts);
                });
            });
        });
    });
});

