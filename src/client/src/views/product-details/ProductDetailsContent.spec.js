import React from 'react';
import { shallow } from 'enzyme';
import { FormattedNumber } from 'react-intl';

import ProductDetailsContent from './ProductDetailsContent';

import CloseLink from '../../components/CloseLink';
import ProductImage from '../../components/ProductImage';
import BeerFinderLink from '../../components/BeerFinderLink';

import { Stores } from '../../stores/index';

import { getAdaptedProduct } from '../../mockUtils';

describe('<ProductDetailsContent/>', () => {
    let component;
    let store;
    let productMock;

    function renderWrappedComponent() {
        const storeMock = {
            fetchProducts: () => {},
            getDisplayedProductDetails: () => productMock,
            displayedProductList: [productMock]
        };

        component = shallow(
            <ProductDetailsContent
                productId={ productMock.id }
                productListStore={ storeMock }
            />
        ).dive();
    }

    function setupMockStore(overrides) {
        productMock = getAdaptedProduct(overrides);

        store.productList = [
            productMock
        ];
    }

    beforeEach(() => {
        store = Stores.productListStore;
    });

    describe('Given products are loaded', () => {
        beforeEach(() => {
            setupMockStore();

            renderWrappedComponent();
        });

        it('should have a container element', () => {
            expect(component.type()).toEqual('section');
            expect(component.hasClass('product-details')).toBe(true);
        });

        it('should have a close link', () => {
            expect(component.find(CloseLink)).toHaveLength(1);
        });

        it('should have a product image', () => {
            const image = component.find(ProductImage);

            expect(image.props().altText).toEqual(productMock.name);
            expect(image.props().imagePath).toEqual(productMock.imagePath);
        });

        it('should display the product name prominently', () => {
            const header = component.find('h1');

            expect(header.text()).toEqual(productMock.name);
        });
    });


    describe('Product details', () => {
        describe('Always displayed', () => {
            beforeEach(() => {
                setupMockStore();

                renderWrappedComponent();
            });

            it('should contain the product identifier', () => {
                const container = component.find('div.product-id');
                const label = container.find('dt');
                const value = container.find('dd');

                expect(label.text()).toEqual('Product ID');
                expect(value.text()).toEqual(productMock.id);
            });

            it('should contain the product price demarcated as USD but really in CAD due to the underlying Intl API formatting', () => {
                const container = component.find('div.price');
                const label = container.find('dt');
                const value = container.find(FormattedNumber);

                expect(label.text()).toEqual('Price');
                expect(value.props().currency).toEqual('USD');
                expect(value.props().style).toEqual('currency');
                expect(value.props().value).toEqual(productMock.price);
            });

            it('should have a link to the beer finder', () => {
                const container = component.find('div.beer-finder-container');
                const link = container.find(BeerFinderLink);

                expect(link.props().id).toEqual(productMock.id);
            });
        });

        describe('Displayed dependent on data', () => {
            describe('Given there is tasting note data', () => {
                it('should have a tasting note', () => {
                    setupMockStore();

                    renderWrappedComponent();

                    const container = component.find('div.tasting-note');
                    const label = container.find('dt');
                    const value = container.find('dd');

                    expect(label.text()).toEqual('Tasting Note');
                    expect(value.text()).toEqual(productMock.tastingNote);
                });
            });

            describe('Given there is no tasting note data', () => {
                it('should not display a tasting note', () => {
                    setupMockStore({
                        tastingNote: null
                    });

                    renderWrappedComponent();

                    const container = component.find('div.tasting-note');

                    expect(container).toHaveLength(0);
                });
            });

            describe('Given there is varietal data', () => {
                it('should have a varietal note', () => {
                    setupMockStore();

                    renderWrappedComponent();

                    const container = component.find('div.varietal');
                    const label = container.find('dt');
                    const value = container.find('dd');

                    expect(label.text()).toEqual('Varietal');
                    expect(value.text()).toEqual(productMock.varietal);
                });
            });

            describe('Given there is no varietal data', () => {
                it('should not display a varietal note', () => {
                    setupMockStore({
                        varietal: null
                    });

                    renderWrappedComponent();

                    const container = component.find('div.varietal');

                    expect(container).toHaveLength(0);
                });
            });

            describe('Given there is style data', () => {
                it('should have a style note', () => {
                    setupMockStore();

                    renderWrappedComponent();

                    const container = component.find('div.style');
                    const label = container.find('dt');
                    const value = container.find('dd');

                    expect(label.text()).toEqual('Style');
                    expect(value.text()).toEqual(productMock.style);
                });
            });

            describe('Given there is no style data', () => {
                it('should not display a style note', () => {
                    setupMockStore({
                        style: null
                    });

                    renderWrappedComponent();

                    const container = component.find('div.style');

                    expect(container).toHaveLength(0);
                });
            });
        });
    });
});
