import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import ProductImage from './ProductImage';

const sandbox = sinon.sandbox.create();

describe('<ProductImage/>', () => {
    let component;
    let props;

    function renderComponent(overrides) {
        props = Object.freeze({
            altText: 'some text',
            imagePath: 'some/image.png',
            ...overrides
        });

        component = shallow(<ProductImage {...props}/>);
    }

    function assertDisplaysPlaceHolder() {
        it('should display a place holder', () => {
            expect(component.type()).toEqual('div');
            expect(component.hasClass('image-error')).toBe(true);
        });

        it('should display a message', () => {
            expect(component.text()).toEqual('No Image Available');
        });
    }

    afterEach(() => {
        sandbox.restore();
    });

    describe('Given the component renders', () => {
        beforeEach(() => {
            renderComponent();
        });

        it('should be an img element with an identifying class name', () => {
            expect(component.type()).toEqual('img');
            expect(component.hasClass('product-image')).toBe(true);
        });

        it('should have alt text', () => {
            expect(component.props().alt).toEqual(props.altText);
        });

        it('should display an image', () => {
            expect(component.props().src).toEqual(props.imagePath);
        });

        describe('when the img url errors out', () => {
            beforeEach(() => {
                component.simulate('error');
            });

            assertDisplaysPlaceHolder();
        });
    });

    describe('Given the img url is null', () => {
        beforeEach(() => {
            renderComponent({
                imagePath: null
            });
        });

        assertDisplaysPlaceHolder();
    });
});
