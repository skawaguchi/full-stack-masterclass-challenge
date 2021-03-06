import React from 'react';
import { shallow } from 'enzyme';
import { HashRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import AppProvider from './AppProvider';
import ProductListProvider from './ProductListProvider';
import StoreListProvider from './StoreListProvider';
import UIProvider from './UIProvider';
import { HistoryStoreProviderWithRouter } from './HistoryStoreProvider';

import App from '../views/App';

describe('<AppProvider/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            ...overrides
        });

        component = shallow(<AppProvider {...props}/>);
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should be a hash router', () => {
        const browserRouter = component.find(HashRouter);

        expect(browserRouter).toHaveLength(1);
    });

    it('should have localization', () => {
        const intl = component.find(IntlProvider);

        expect(intl.props().locale).toEqual('en');
    });

    it('should have a provider for the product list', () => {
        const provider = component.find(ProductListProvider);

        expect(provider).toHaveLength(1);
    });

    it('should have a provider for the store list', () => {
        const provider = component.find(StoreListProvider);

        expect(provider).toHaveLength(1);
    });

    it('should have a provider for the ui', () => {
        const provider = component.find(UIProvider);

        expect(provider).toHaveLength(1);
    });

    it('should have a provider for the history store with the router', () => {
        const provider = component.find(HistoryStoreProviderWithRouter);

        expect(provider).toHaveLength(1);
    });

    it('should have the application component', () => {
        const app = component.find(App);

        expect(app).toHaveLength(1);
    });
});

