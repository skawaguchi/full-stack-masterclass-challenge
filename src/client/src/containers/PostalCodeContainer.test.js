import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router';

import PostalCodeContainer from './PostalCodeContainer';

import Loader from '../components/Loader';

import { Stores } from '../stores/index';

import { getMockReactClass } from '../mockUtils';

const sandbox = sinon.sandbox.create();

describe('<PostalCodeContainer/>', () => {
    let component;
    let store;
    let MockReactClass;

    function renderMountedComponent() {
        component = mount(
            <MemoryRouter>
                <PostalCodeContainer
                    storeListStore={ store }
                >
                    <MockReactClass/>
                </PostalCodeContainer>
            </MemoryRouter>
        );
    }

    function renderWrappedComponent() {
        component = shallow(
            <PostalCodeContainer
                storeListStore={ store }
            >
                <MockReactClass/>
            </PostalCodeContainer>
        ).dive();
    }

    beforeEach(() => {
        store = Stores.storeListStore;

        sandbox.stub(store, 'fetchGeo');

        MockReactClass = getMockReactClass();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given the component renders', () => {
        describe('and there is no postal code', () => {
            it('should show the loader', () => {
                store.postalCode = null;

                renderWrappedComponent();

                expect(component.type()).toEqual(Loader);
            });
        });

        describe('and there is a postal code', () => {
            it('should render children', () => {
                store.postalCode = 'some code';

                renderWrappedComponent();

                expect(component.type()).toEqual(MockReactClass);
            });
        });
    });

    describe('Given the component is rendered without a postal code', () => {
        describe('when the component mounts', () => {
            it('should load the user\'s postal code', () => {
                store.postalCode = null;

                renderMountedComponent();

                sinon.assert.calledOnce(store.fetchGeo);
            });
        });
    });
});

