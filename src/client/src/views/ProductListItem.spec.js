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

        it('should have an identifiable link to the product displaying the name of the product and the image', () => {
            const link = component.find(Link);
            const image = link.find(ProductImage);
            const label = link.find('span.product-name');

            expect(link.hasClass('product-link')).toBe(true);
            expect(link.props().to).toEqual(`/product/${props.id}`);
            expect(label.text()).toEqual(props.name);

            expect(image.props().altText).toEqual(props.name);
            expect(image.props().imagePath).toEqual(props.imagePath);
        });

        it('should have a link to the beer finder for the product', () => {
            const link = component.find(BeerFinderLink);

            expect(link.props().id).toEqual(props.id);
        });
    });
});
