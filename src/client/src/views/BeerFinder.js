import React from 'react';

import ProductListContainer from './ProductListContainer';
import StoreListContainer from './StoreListContainer';
import PostalCodeContainer from './PostalCodeContainer';
import BeerFinderContent from './beer-finder/BeerFinderContent';

function BeerFinder(props) {
    const { productId } = props.match.params;

    return (
        <ProductListContainer>
            <PostalCodeContainer>
                <StoreListContainer productId={ productId }>
                    <BeerFinderContent productId={ productId }/>
                </StoreListContainer>
            </PostalCodeContainer>
        </ProductListContainer>
    );
}
export default BeerFinder;
