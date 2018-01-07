import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import AppProvider from './AppProvider';
import ProductListProvider from './ProductListProvider';

import App from './App';

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

    it('should be a browser router', () => {
        const browserRouter = component.find(BrowserRouter);

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

    it('should have the application component', () => {
        const app = component.find(App);

        expect(app).toHaveLength(1);
    });
});

