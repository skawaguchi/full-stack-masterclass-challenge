import React from 'react';
import { mock, shallow } from 'enzyme';

import ProductListProvider from './ProductListProvider';

import { Provider } from 'mobx-react';

import { Stores } from '../stores/index';

import { getMockReactClass } from '../mockUtils'

describe('<ProductListProvider/>', () => {
    let component;
    let props;
    let ChildMock;

    function renderComponent(overrides) {
        props = Object.freeze({
            ...overrides
        });

        ChildMock = getMockReactClass();

        component = shallow(
            <ProductListProvider {...props}>
                <ChildMock/>
            </ProductListProvider>
        );
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should connect the product store', () => {
        const provider = component.find(Provider);

        expect(provider).toHaveLength(1);
        expect(provider.props().productList).toEqual(Stores.productList);
    });

    it('should pass children through', () => {
        const provider = component.find(Provider);

        expect(provider.childAt(0).type()).toEqual(ChildMock);
    });
});

