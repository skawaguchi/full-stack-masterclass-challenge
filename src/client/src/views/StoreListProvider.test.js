import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'mobx-react';

import StoreListProvider from './StoreListProvider';

import { Stores } from '../stores/index';
import { getMockReactClass } from '../mockUtils';

describe('<StoreListProvider/>', () => {
    let component;
    let props;
    let ChildMock;

    function renderComponent(overrides) {
        props = Object.freeze({
            ...overrides
        });

        ChildMock = getMockReactClass();

        component = shallow(
            <StoreListProvider {...props}>
                <ChildMock/>
            </StoreListProvider>
        );
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should connect the store list store', () => {
        const provider = component.find(Provider);

        expect(provider).toHaveLength(1);
        expect(provider.props().storeList).toEqual(Stores.storeList);
    });

    it('should pass children through', () => {
        const provider = component.find(Provider);

        expect(provider.childAt(0).type()).toEqual(ChildMock);
    });
});

