import React from 'react';
import { shallow } from 'enzyme';

import StoreListTableRowItem from './StoreListTableRowItem';

import { getAdaptedStore } from '../../mockUtils';

describe('<StoreListTableRowItem/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {

        props = Object.freeze({
            item: getAdaptedStore(overrides)
        });

        component = shallow(
            <StoreListTableRowItem {...props}/>
        );
    }

    describe('Given the component renders', () => {
        beforeEach(() => {
            renderComponent();
        });

        it('should have a container element', () => {
            expect(component.type()).toEqual('tr');
        });
    });
});
