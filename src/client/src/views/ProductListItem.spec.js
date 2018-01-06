import React from 'react';
import { shallow } from 'enzyme';

import ProductListItem from './ProductListItem';

import ProductImage from '../components/ProductImage';

describe('ProductListItem', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            name: 'some name',
            imagePath: 'some/path.png',
            ...overrides
        });

        component = shallow(<ProductListItem {...props}/>);
    }

    describe('Given the component renders', () => {
        beforeEach(() => {
            renderComponent();
        });

        it('should have a container', () => {
            expect(component.type()).toEqual('div');
            expect(component.hasClass('product-list-item')).toBe(true);
        });

        it('should have a product image', () => {
            const image = component.find(ProductImage);

            expect(image.props().altText).toEqual(props.name);
            expect(image.props().imagePath).toEqual(props.imagePath);
        });

        it('should display the item name', () => {
            const name = component.find('.name');

            expect(name.text()).toEqual(props.name);
        });
    });
});
