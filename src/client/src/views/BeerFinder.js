import React from 'react';

import ProductListContainer from './ProductListContainer';
import BeerFinderContent from './beer-finder/BeerFinderContent';

function BeerFinder(props) {
    const { productId } = props.match.params;

    return (
        <ProductListContainer>
            <BeerFinderContent productId={ productId }/>
        </ProductListContainer>
    );
}
export default BeerFinder;
