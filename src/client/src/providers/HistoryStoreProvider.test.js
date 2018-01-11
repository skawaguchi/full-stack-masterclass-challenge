import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { HistoryStoreProviderWithRouter } from './HistoryStoreProvider';

import { getMockReactClass } from '../mockUtils';

const sandbox = sinon.sandbox.create();

describe('<HistoryStoreProvider/>', () => {
    let component;
    let ChildMock;
    let historynMock;
    let storeMock;

    function renderComponent() {
        ChildMock = getMockReactClass();
        historynMock = {};
        storeMock = {
            appHistory: null
        };

        component = shallow(
            <HistoryStoreProviderWithRouter.WrappedComponent
                history={ historynMock }
                uiStore={ storeMock }
            >
                <ChildMock/>
            </HistoryStoreProviderWithRouter.WrappedComponent>
        ).dive();
    }

    beforeEach(() => {
        renderComponent();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('When the component mounts', () => {
        it('should set the app history', () => {

        });
    });

    it('should pass children through', () => {
        expect(component.type()).toEqual(ChildMock);
    });
});

