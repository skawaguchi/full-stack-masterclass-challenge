import React from 'react';
import { shallow } from 'enzyme';

import StoreListTableRows from './StoreListTableRows';

import StoreListTableRowItem from './StoreListTableRowItem';

import { getAdaptedStore } from '../../mockUtils';

describe('<StoreListTableRows/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            postalCode: 'some code',
            storeList: [
                getAdaptedStore()
            ],
            ...overrides
        });

        component = shallow(
            <StoreListTableRows {...props}/>
        );
    }

    describe('Given stores are loaded', () => {
        beforeEach(() => {
            renderComponent();
        });

        it('should have a container element', () => {
            expect(component.type()).toEqual('tbody');
        });

        it('should have row items', () => {
            const rowItems = component.find(StoreListTableRowItem);

            expect(rowItems).toHaveLength(props.storeList.length);

            rowItems.forEach((item, index) => {
                expect(item.props().item).toEqual(props.storeList[index]);
                expect(item.props().postalCode).toEqual(props.postalCode);
            });
        });
    });
});
