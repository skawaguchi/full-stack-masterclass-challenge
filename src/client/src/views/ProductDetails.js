import React, { Component } from 'react';

import AppContainer from './AppContainer';
import ProductDetailsContent from './product-details/ProductDetailsContent';

function ProductDetails(props) {
    const id = props.match.params.productId;

    return (
        <AppContainer>
            <ProductDetailsContent id={ id }/>
        </AppContainer>
    );
}

export default ProductDetails;
