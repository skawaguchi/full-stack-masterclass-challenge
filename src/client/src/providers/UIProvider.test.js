import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'mobx-react';

import UIProvider from './UIProvider';

import { Stores } from '../stores/index';
import { getMockReactClass } from '../mockUtils';

describe('<UIProvider/>', () => {
    let component;
    let ChildMock;

    function renderComponent() {
        ChildMock = getMockReactClass();

        component = shallow(
            <UIProvider>
                <ChildMock/>
            </UIProvider>
        );
    }

    beforeEach(() => {
        renderComponent();
    });

    it('should connect the ui store', () => {
        const provider = component.find(Provider);

        expect(provider).toHaveLength(1);
        expect(provider.props().uiStore).toEqual(Stores.uiStore);
    });

    it('should pass children through', () => {
        const provider = component.find(Provider);

        expect(provider.childAt(0).type()).toEqual(ChildMock);
    });
});

