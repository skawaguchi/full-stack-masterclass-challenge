import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import sinon from 'sinon';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';

import BeerFinderContent from './BeerFinderContent';

import CloseLink from '../../components/CloseLink';
import StoreListTableRows from './StoreListTableRows';

import { Stores } from '../../stores/index';

import { getAdaptedProduct, getAdaptedStore } from '../../mockUtils';

const sandbox = sinon.sandbox.create();

describe('<BeerFinderContent/>', () => {
    let component;
    let store;
    let productMock;
    let storeMock;
    let sortedStoreList;

    function renderWrappedComponent() {
        sortedStoreList = [{}];

        const productStoreMock = {
            getProductName: sandbox.stub()
        };
        const storeStoreMock = {
            getStoresByDistance: () => sortedStoreList
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

            expect(label.text()).toEqual('You searched for:');
            expect(name.text()).toEqual(productMock.name);
        });

        it('should have a table for the store data', () => {
            const table = component.find('table');

            expect(table.hasClass('store-list')).toBe(true);
        });

        it('should have a table header', () => {
            const head = component.find('thead');
            const row = head.find('tr');
            const headerCells = row.find('th');

            expect(head).toHaveLength(1);
            expect(row).toHaveLength(1);
            expect(headerCells).toHaveLength(6);
        });

        it('should have a table body', () => {
            const body = component.find(StoreListTableRows);

            expect(body.props().storeList).toEqual(sortedStoreList);
        });
    });
});
