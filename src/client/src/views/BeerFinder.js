import React from 'react';
import { PropTypes } from 'prop-types';

import ProductListContainer from '../containers/ProductListContainer';
import StoreListContainer from '../containers/StoreListContainer';
import PostalCodeContainer from '../containers/PostalCodeContainer';
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

BeerFinder.propTypes = {
    match: PropTypes.object.isRequired
};

export default BeerFinder;
