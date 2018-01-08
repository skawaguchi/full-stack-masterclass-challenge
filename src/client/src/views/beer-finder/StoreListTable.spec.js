import React from 'react';
import { shallow } from 'enzyme';

import StoreListTable from './StoreListTable';

import StoreListTableRows from './StoreListTableRows';

import { getAdaptedStore } from '../../mockUtils';

describe('<StoreListTable/>', () => {
    let component;
    let props;

    function renderComponent() {
        props = Object.freeze({
            postalCode: 'some code',
            storeList: [
                getAdaptedStore()
            ]
        });

        component = shallow(
            <StoreListTable {...props}/>
        );
    }

    describe('Given the component renders', () => {
        beforeEach(() => {
            renderComponent();
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

            expect(body.props().postalCode).toEqual(props.postalCode);
            expect(body.props().storeList).toEqual(props.storeList);
        });

    });
});
