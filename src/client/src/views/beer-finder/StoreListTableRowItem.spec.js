import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { FormattedNumber } from 'react-intl';

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

        it('should display the distance', () => {
            const container = component.find('td.distance');
            const number = container.find(FormattedNumber);
            const unit = container.find('span.unit-label');

            expect(number.props().maximumFractionDigits).toEqual(1);
            expect(number.props().value).toEqual(props.item.distance);
            expect(unit.text()).toEqual('km');
        });

        it('should display the quantity', () => {
            const container = component.find('td.quantity');
            const number = container.find(FormattedNumber);

            expect(number.props().value).toEqual(props.item.quantity);
        });

        it('should display the store info', () => {
            const container = component.find('td.store-info');

            expect(container.text()).toContain(props.item.addressLine1);
            expect(container.text()).toContain(props.item.addressLine2);
            expect(container.text()).toContain(props.item.city);
            expect(container.text()).toContain(props.item.id);
        });

        it('should display the hours', () => {
            const container = component.find('td.hours');

            expect(container).toHaveLength(1);
        });

        it('should display the phone', () => {
            const container = component.find('td.telephone');

            expect(container.text()).toContain(props.item.telephone);
        });
    });


    describe('Given there is no address line 2', () => {
        it('should not display the line', () => {
            renderComponent({
                addressLine2: null
            });

            const container = component.find('td.store-info');

            expect(container.text()).not.toContain(props.item.addressLine2);
        });
    });
});
