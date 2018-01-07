import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import ProductListItem from './ProductListItem';

import ProductImage from '../components/ProductImage';
import BeerFinderLink from '../components/BeerFinderLink';

describe('<ProductListItem/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            id: 'someId',
            imagePath: 'some/path.png',
            name: 'some name',
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

        it('should have a link to the product displaying the name of the product', () => {
            const name = component.find(Link);

            expect(name.props().to).toEqual(`/product/${props.id}`);
            expect(name.childAt(0).text()).toEqual(props.name);
        });

        it('should have a link to the beer finder for the product', () => {
            const link = component.find(BeerFinderLink);

            expect(link.props().id).toEqual(props.id);
        });
    });
});
