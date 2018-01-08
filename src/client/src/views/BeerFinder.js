import React from 'react';

import ProductListContainer from './ProductListContainer';
import StoreListContainer from './StoreListContainer';
import PostalCodeContainer from './PostalCodeContainer';
import BeerFinderContent from './beer-finder/BeerFinderContent';

function BeerFinder(props) {
    const { productId } = props.match.params;

    return (
        <ProductListContainer>
            <StoreListContainer productId={ productId }>
                <PostalCodeContainer>
                    <BeerFinderContent productId={ productId }/>
                </PostalCodeContainer>
            </StoreListContainer>
        </ProductListContainer>
    );
}
export default BeerFinder;
