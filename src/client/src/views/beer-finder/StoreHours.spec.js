import React from 'react';
import { shallow } from 'enzyme';

import StoreHours from './StoreHours';

import { getAdaptedHours } from '../../mockUtils';

describe('<StoreHours/>', () => {
    let component;
    let props;

    function renderComponent() {
        props = Object.freeze({
            hours: getAdaptedHours({
                sunday: {
                    close: 320,
                    open: 100
                },
                monday: {
                    close: 1200,
                    open: 630
                },
                tuesday: {
                    close: 800,
                    open: 540
                },
                wednesday: {
                    close: 1200,
                    open: 630
                },
                thursday: {
                    close: 320,
                    open: 100
                },
                friday: {
                    close: 1200,
                    open: 630
                },
                saturday: {
                    close: 320,
                    open: 100
                }
            })
        });

        component = shallow(
            <StoreHours {...props}/>
        );
    }

    describe('Given the component renders', () => {
        beforeEach(() => {
            renderComponent();
        });

        it('should have a container', () => {
            const hours = component.find('dl.store-hours');

            expect(hours).toHaveLength(1);
        });

        it('should display the opening and closing time for sunday', () => {
            const day = component.find('div.sunday');
            const label = day.find('dt');
            const hours = day.find('dd');

            const open = '1:40 AM';
            const close = '5:20 AM';

            expect(label.text()).toEqual('Sun');
            expect(hours.text()).toEqual(`${open} - ${close}`);
        });

        it('should display the opening and closing time for monday', () => {
            const day = component.find('div.monday');
            const label = day.find('dt');
            const hours = day.find('dd');

            const open = '10:30 AM';
            const close = '8:00 PM';

            expect(label.text()).toEqual('Mon');
            expect(hours.text()).toEqual(`${open} - ${close}`);
        });

        it('should display the opening and closing time for tuesday', () => {
            const day = component.find('div.tuesday');
            const label = day.find('dt');
            const hours = day.find('dd');

            const open = '9:00 AM';
            const close = '1:20 PM';

            expect(label.text()).toEqual('Tue');
            expect(hours.text()).toEqual(`${open} - ${close}`);
        });

        it('should display the opening and closing time for wednesday', () => {
            const day = component.find('div.wednesday');
            const label = day.find('dt');
            const hours = day.find('dd');

            const open = '10:30 AM';
            const close = '8:00 PM';

            expect(label.text()).toEqual('Wed');
            expect(hours.text()).toEqual(`${open} - ${close}`);
        });

        it('should display the opening and closing time for thursday', () => {
            const day = component.find('div.thursday');
            const label = day.find('dt');
            const hours = day.find('dd');

            const open = '1:40 AM';
            const close = '5:20 AM';

            expect(label.text()).toEqual('Thu');
            expect(hours.text()).toEqual(`${open} - ${close}`);
        });

        it('should display the opening and closing time for friday', () => {
            const day = component.find('div.friday');
            const label = day.find('dt');
            const hours = day.find('dd');

            const open = '10:30 AM';
            const close = '8:00 PM';

            expect(label.text()).toEqual('Fri');
            expect(hours.text()).toEqual(`${open} - ${close}`);
        });

        it('should display the opening and closing time for saturday', () => {
            const day = component.find('div.saturday');
            const label = day.find('dt');
            const hours = day.find('dd');

            const open = '1:40 AM';
            const close = '5:20 AM';

            expect(label.text()).toEqual('Sat');
            expect(hours.text()).toEqual(`${open} - ${close}`);
        });
    });
});
