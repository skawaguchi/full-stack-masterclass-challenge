import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { FormattedNumber } from 'react-intl';

import StoreListTableRowItem from './StoreListTableRowItem';

import { getAdaptedStore } from '../../mockUtils';

const sandbox = sinon.sandbox.create();

describe('<StoreListTableRowItem/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            item: getAdaptedStore(overrides),
            postalCode: 'some code'
        });

        component = shallow(
            <StoreListTableRowItem {...props}/>
        );
    }

    afterEach(() => {
        sandbox.restore();
    });

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

        it('should display the phone number', () => {
            const container = component.find('td.telephone');

            expect(container.text()).toContain(props.item.telephone);
        });

        it('should have a button to get directions', () => {
            const container = component.find('td.directions');
            const button = container.find('button');

            expect(container).toHaveLength(1);
            expect(button.text()).toEqual('Get Directions');
        });

        describe('when the directions button is clicked', () => {
            it('should get directions in a new browser tab', () => {
                const domain = 'https://www.google.com';
                const path = 'maps/dir';
                const userLocation = props.postalCode;
                const address = `${props.item.addressLine1} ${props.item.addressLine1} ${props.item.city} Ontario ${props.item.postalCode}`;
                const fullPath = `${domain}/${path}/${userLocation}/${address}`;

                const button = component.find('td.directions button');

                const openStub = sandbox.stub(window, 'open');

                button.simulate('click');

                sinon.assert.calledOnce(openStub);
                sinon.assert.calledWithExactly(openStub, fullPath, 'directions');
            });
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
