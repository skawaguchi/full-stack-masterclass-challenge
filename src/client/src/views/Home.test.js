import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

import ProductListContainer from '../containers/ProductListContainer';
import AppHeader from './AppHeader';
import ProductList from './home/ProductList';

import { Stores } from '../stores/index';

describe('<Home/>', () => {
    let component;
    let store;

    function renderWrappedComponent() {
        store = Stores.productListStore;

        component = shallow(
            <Home productListStore={ store }/>
        ).dive();
    }

    describe('Given the component renders', () => {
        beforeEach(() => {
            renderWrappedComponent();
        });

        it('should ensure the products are loaded', () => {
            expect(component.type()).toEqual(ProductListContainer);
        });

        it('should have a containing element that is uniquely identifiable', () => {
            const container = component.find('section.home');

            expect(container.hasClass('home')).toBe(true);
        });

        it('should have the header for the application', () => {
            const header = component.find(AppHeader);

            expect(header).toHaveLength(1);
        });

        it('should have the product list', () => {
            const list = component.find(ProductList);

            expect(list.props().productListItems).toEqual(store.displayedProductList);
        });
    });
});
