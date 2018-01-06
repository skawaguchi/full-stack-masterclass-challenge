import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './AppProvider';
import ProductListProvider from './ProductListProvider';

import AppContainer from './AppContainer';

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
        expect(component.type()).toEqual(BrowserRouter);
    });

    it('should have a provider for the product list', () => {
        const provider = component.find(ProductListProvider);

        expect(provider).toHaveLength(1);
    });

    it('should have the application component', () => {
        const app = component.find(AppContainer);

        expect(app).toHaveLength(1);
    });
});

