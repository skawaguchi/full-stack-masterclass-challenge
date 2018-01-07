import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';

import CloseLink from '../../components/CloseLink';
import ProductImage from '../../components/ProductImage';

import './ProductDetailsContent.css';

@inject('productListStore')
@observer
class ProductDetailsContent extends Component {
    render() {
        const product = this.props.productListStore.getDisplayedProductDetails(this.props.id);

        return (
            <section className="product-details">
                <CloseLink/>
                <ProductImage
                    altText={ product.name }
                    imagePath={ product.imagePath }
                />
            </section>
        );
    }
}

ProductDetailsContent.wrappedComponent.propTypes = {
    id: PropTypes.string.isRequired,
    productListStore: PropTypes.shape({
        fetchProducts: PropTypes.func.isRequired,
        displayedProductList: PropTypes.arrayOf(PropTypes.object)
    })
};

export default ProductDetailsContent;
