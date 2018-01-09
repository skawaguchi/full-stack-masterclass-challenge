import React from 'react';
import { PropTypes } from 'prop-types';

import ProductListContainer from './ProductListContainer';
import ProductDetailsContent from './product-details/ProductDetailsContent';

function ProductDetails(props) {
    const { productId } = props.match.params;

    return (
        <ProductListContainer>
            <ProductDetailsContent productId={ productId }/>
        </ProductListContainer>
    );
}

ProductDetails.propTypes = {
    match: PropTypes.object.isRequired
};

export default ProductDetails;
