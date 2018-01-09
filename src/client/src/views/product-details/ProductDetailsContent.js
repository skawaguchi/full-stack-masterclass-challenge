import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';
import { FormattedNumber } from 'react-intl';

import CloseLink from '../../components/CloseLink';
import ProductImage from '../../components/ProductImage';
import BeerFinderLink from '../../components/BeerFinderLink';

import './ProductDetailsContent.css';

function getOptionalContent(config, product) {
    return product[config.attr] ?
        <div className={ config.className }>
            <dt>{ config.label }</dt>
            <dd>{ product[config.attr] }</dd>
        </div> :
        null;
}

@inject('productListStore')
@observer
class ProductDetailsContent extends Component {
    render() {
        const product = this.props.productListStore.getDisplayedProductDetails(this.props.productId);
        const tastingNoteConfig = {
            attr: 'tastingNote',
            className: 'tasting-note',
            label: 'Tasting Note'
        };
        const varietalConfig = {
            attr: 'varietal',
            className: 'varietal',
            label: 'Varietal'
        };
        const styleConfig = {
            attr: 'style',
            className: 'style',
            label: 'Style'
        };

        return (
            <section className="product-details">
                <CloseLink/>
                <ProductImage
                    altText={ product.name }
                    imagePath={ product.imagePath }
                />
                <h1>{ product.name }</h1>
                <dl className="product-details-content">
                    <div className="beer-finder">
                        <dt>{ 'Beer Finder' }</dt>
                        <dd><BeerFinderLink id={ product.id }/></dd>
                    </div>
                    <div className="product-id">
                        <dt>{ 'Product ID' }</dt>
                        <dd>{ product.id }</dd>
                    </div>
                    <div className="price">
                        <dt>{'Price'}</dt>
                        <dd>
                            <FormattedNumber
                                currency='USD'
                                style='currency'
                                value={ product.price }
                            />
                        </dd>
                    </div>
                    { getOptionalContent(tastingNoteConfig, product) }
                    { getOptionalContent(varietalConfig, product) }
                    { getOptionalContent(styleConfig, product) }
                </dl>
            </section>
        );
    }
}

ProductDetailsContent.wrappedComponent.propTypes = {
    productId: PropTypes.string.isRequired,
    productListStore: PropTypes.shape({
        displayedProductList: PropTypes.arrayOf(PropTypes.object),
        fetchProducts: PropTypes.func.isRequired,
        getDisplayedProductDetails: PropTypes.func.isRequired
    })
};

export default ProductDetailsContent;
