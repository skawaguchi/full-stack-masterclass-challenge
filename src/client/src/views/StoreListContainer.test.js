import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router';

import StoreListContainer from './StoreListContainer';

import Loader from '../components/Loader';

import { Stores } from '../stores/index';

import { getMockReactClass } from '../mockUtils';

import * as storeRepositories from '../repositories/Stores';

const sandbox = sinon.sandbox.create();

describe('<StoreListContainer/>', () => {
    let component;
    let store;
    let productIdMock;
    let postalCodeMock;
    let MockReactClass;

    function renderMountedComponent() {
        component = mount(
            <MemoryRouter>
                <StoreListContainer
                    productId={ productIdMock }
                    storeListStore={ store }
                >
                    <MockReactClass/>
                </StoreListContainer>
            </MemoryRouter>
        );
    }

    function renderWrappedComponent() {
        component = shallow(
            <StoreListContainer
                productId={ productIdMock }
                storeListStore={ store }
            >
                <MockReactClass/>
            </StoreListContainer>
        ).dive();
    }

    beforeEach(() => {
        store = Stores.storeListStore;

        postalCodeMock = 'some code';
        productIdMock = 'someId';

        store.postalCode = postalCodeMock;

        sandbox.stub(storeRepositories, 'getStores');

        sandbox.stub(store, 'fetchStores');

        MockReactClass = getMockReactClass();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given the component renders', () => {
        describe('and there are no stores', () => {
            it('should show the loader', () => {
                store.storeList = null;

                renderWrappedComponent();

                expect(component.type()).toEqual(Loader);
            });
        });
        describe('and there are stores', () => {
            it('should render children', () => {
                store.storeList = [{}];

                renderWrappedComponent();

                expect(component.type()).toEqual(MockReactClass);
            });
        });
    });

    describe('Given the component is rendered with a store', () => {
        describe('when the component mounts', () => {
            it('should load the store list', () => {
                store.storeList = null;

                renderMountedComponent();

                sinon.assert.calledOnce(store.fetchStores);
                sinon.assert.calledWithExactly(store.fetchStores, productIdMock, postalCodeMock);
            });
        });
    });
});

