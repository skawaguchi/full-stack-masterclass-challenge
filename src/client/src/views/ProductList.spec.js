import React from 'react';
import { shallow } from 'enzyme';

import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

import { getProductListItem } from '../mockUtils';

describe('ProductList', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            productListItems: [
                getProductListItem()
            ],
            ...overrides
        });

        component = shallow(<ProductList {...props}/>);
    }

    describe('Given the component renders', () => {
        it('should have a container', () => {
            renderComponent();

            expect(component.type()).toEqual('div');
            expect(component.hasClass('product-list')).toBe(true);
        });
    });

    describe('Given a list of products', () => {
        it('should display the product list item', () => {
            renderComponent();

            const item = component.find(ProductListItem);
            const itemProps = props.productListItems[0];

            expect(item.props().name).toEqual(itemProps.name);
            expect(item.props().imagePath).toEqual(itemProps.imagePath);
            expect(item.props().productNumber).toEqual(itemProps.productNumber);
        });
    });

    describe('Given there are no products', () => {
        it('should display a not found message', () => {
            renderComponent({
                productListItems: []
            });

            const message = component.childAt(0);

            expect(message.type()).toEqual('div');
            expect(message.hasClass('no-products')).toBe(true);
            expect(message.text().length).toBeGreaterThan(0);
        });
    });
});
