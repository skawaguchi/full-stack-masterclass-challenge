import React from 'react';
import { shallow } from 'enzyme';
import { Route, Switch } from 'react-router-dom';

import App from './App';

import Home from './Home';
import ProductDetails from './ProductDetails';
import BeerFinder from './BeerFinder';
import NotFound from './NotFound';

describe('<App/>', () => {
    let component;

    function renderComponent() {
        component = shallow(
            <App/>
        );
    }

    describe('Given the component renders', () => {
        beforeEach(() => {
            renderComponent();
        });

        it('should have a container element', () => {
            expect(component.type()).toEqual('main');
            expect(component.hasClass('app')).toBe(true);
        });

        describe('Routes', () => {
            let switchEl;

            beforeEach(() => {
                switchEl = component.find(Switch);
            });

            it('should set the view based on the url', () => {
                expect(switchEl).toHaveLength(1);
                expect(switchEl.children().length).toBeGreaterThan(0);
            });

            it('should have a route exactly matching route for the home view', () => {
                const homeRoute = switchEl.childAt(0);

                expect(homeRoute.type()).toEqual(Route);
                expect(homeRoute.props().exact).toBeTruthy();
                expect(homeRoute.props().path).toEqual('/');
                expect(homeRoute.props().component).toEqual(Home);
            });

            it('should have a route exactly matching the product details view', () => {
                const productDetailsRoute = switchEl.childAt(1);

                expect(productDetailsRoute.type()).toEqual(Route);
                expect(productDetailsRoute.props().path).toEqual('/product/:productId');
                expect(productDetailsRoute.props().exact).toBeTruthy();
                expect(productDetailsRoute.props().component).toEqual(ProductDetails);
            });

            it('should have a route exactly matching the beer finder view', () => {
                const beerFinderRoute = switchEl.childAt(2);

                expect(beerFinderRoute.type()).toEqual(Route);
                expect(beerFinderRoute.props().exact).toBeTruthy();
                expect(beerFinderRoute.props().path).toEqual('/product/:productId/beer-finder');
                expect(beerFinderRoute.props().component).toEqual(BeerFinder);
            });

            it('should have a not matching route', () => {
                const notMatchingRoute = switchEl.childAt(3);

                expect(notMatchingRoute.type()).toEqual(Route);
                expect(notMatchingRoute.props().path).toEqual('*');
                expect(notMatchingRoute.props().component).toEqual(NotFound);
            });
        });
    });
});

