import React from 'react';

import ProductListContainer from './ProductListContainer';
import CloseLink from '../components/CloseLink';

function BeerFinder() {
    return (
        <ProductListContainer>
            <section className="beer-finder">
                <CloseLink/>
            </section>
        </ProductListContainer>
    );
}
export default BeerFinder;
