import React, { Component } from 'react';

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

export default ProductDetails;
