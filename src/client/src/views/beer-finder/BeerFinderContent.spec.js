import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import sinon from 'sinon';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';

import BeerFinderContent from './BeerFinderContent';

import CloseLink from '../../components/CloseLink';
import StoreListTable from './StoreListTable';

import { Stores } from '../../stores/index';

import { getAdaptedProduct, getAdaptedStore } from '../../mockUtils';

const sandbox = sinon.sandbox.create();

describe('<BeerFinderContent/>', () => {
    let component;
    let store;
    let postalCodeMock;
    let productMock;
    let storeMock;
    let sortedStoreList;
    let productStoreMock;
    let storeStoreMock;

    function renderWrappedComponent() {

        productStoreMock = {
            getProductName: sandbox.stub()
        };
        storeStoreMock = {
            postalCode: postalCodeMock,
            refreshStores: sandbox.stub(),
            storeList: sortedStoreList
        };

        productStoreMock.getProductName.returns(productMock.name);

        component = shallow(
            <BeerFinderContent
                productId={ productMock.id }
                productListStore={ productStoreMock }
                storeListStore={ storeStoreMock }
            />
        ).dive();
    }

    function setupMockStore(overrides) {
        store = Stores;

        postalCodeMock = 'some postal code';

        storeMock = getAdaptedStore(overrides);
        productMock = getAdaptedProduct();

        store.storeListStore.storeList = [
            storeMock
        ];

        store.productListStore.productList = [
            productMock
        ];
    }

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given stores are loaded', () => {
        beforeEach(() => {
            sortedStoreList = [{}];

            setupMockStore();

            renderWrappedComponent();
        });

        it('should have a container element', () => {
            expect(component.type()).toEqual('section');
            expect(component.hasClass('beer-finder')).toBe(true);
        });

        it('should have a close link', () => {
            expect(component.find(CloseLink)).toHaveLength(1);
        });

        describe('and stores were found', () => {
            it('should have a table for the stores', () => {
                const table = component.find(StoreListTable);

                expect(table.props().postalCode).toEqual(postalCodeMock);
                expect(table.props().storeList).toEqual(sortedStoreList);
            });
        });

        describe('and no stores were found', () => {
            it('should display a message and not show the table', () => {
                sortedStoreList = [];

                setupMockStore();

                renderWrappedComponent();

                const table = component.find(StoreListTable);
                const message = component.find('div.no-stores-message');

                expect(table).toHaveLength(0);
                expect(message.text().length).toBeGreaterThan(0);
            });
        });

        it('should have a link to the details page', () => {
            const link = component.find(Link);
            const icon = link.childAt(0);
            const label = link.find('span.back-label');

            expect(link.props().to).toEqual(`/product/${productMock.id}`);
            expect(label.text()).toEqual('Back to Product Details');
            expect(icon.type()).toEqual(FontAwesomeIcon);
            expect(icon.props().icon).toEqual(faArrowLeft);
        });

        it('should display the searched product name prominently', () => {
            const header = component.find('h1');
            const label = header.find('span.search-label');
            const name = header.find('span.product-name');

            expect(label.text()).toEqual('You searched for');
            expect(name.text()).toEqual(productMock.name);
        });

        it('should have a controls container with the postal code input', () => {
            const controls = component.find('div.controls');
            const label = controls.find('span');
            const input = controls.find('input');

            expect(controls).toHaveLength(1);
            expect(label.text()).toEqual('Search by Postal Code');
            expect(input.props().placeholder).toEqual('A1A 2B2 or A1A');
            expect(input.props().type).toEqual('text');
            expect(input.props().value).toEqual(postalCodeMock);
        });

        describe('when the postal code is changed', () => {
            it('should query the stores again', () => {
                const input = component.find('div.controls input');
                const changedPostalCode = 'some change';
                const event = {
                    target: {
                        value: changedPostalCode
                    }
                };

                input.simulate('change', event);

                sinon.assert.calledOnce(storeStoreMock.refreshStores);
                sinon.assert.calledWithExactly(storeStoreMock.refreshStores, productMock.id, changedPostalCode);
            });
        });
    });
});
