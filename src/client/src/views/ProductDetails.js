import React, { Component } from 'react';

import ProductListContainer from './ProductListContainer';
import ProductDetailsContent from './product-details/ProductDetailsContent';

function ProductDetails(props) {
    const id = props.match.params.productId;

    return (
        <ProductListContainer>
            <ProductDetailsContent id={ id }/>
        </ProductListContainer>
    );
}

export default ProductDetails;
