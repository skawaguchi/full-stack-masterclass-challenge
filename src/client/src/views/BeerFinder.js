import React from 'react';

import ProductListContainer from './ProductListContainer';
import StoreListContainer from './StoreListContainer';
import BeerFinderContent from './beer-finder/BeerFinderContent';

function BeerFinder(props) {
    const { productId } = props.match.params;

    return (
        <ProductListContainer>
            <StoreListContainer productId={ productId }>
                <BeerFinderContent productId={ productId }/>
            </StoreListContainer>
        </ProductListContainer>
    );
}
export default BeerFinder;
