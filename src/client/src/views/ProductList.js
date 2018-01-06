import React from 'react';
import { PropTypes } from 'prop-types';

import ProductListItem from './ProductListItem';

function ProductList(props) {
    return (
        <div className="product-list">
            {
                props.productListItems.length ?
                    props.productListItems.map((item) => (
                        <ProductListItem
                            key={item.id}
                            imagePath={item.imagePath}
                            name={item.name}
                            productNumber={item.productNumber}
                        />
                    )) :
                    <div className='no-products'>
                        {
                            `
                            Uh oh! We couldn't find any seasonal selections! There must be something wrong...
                            We'll check it out right away!
                            Please come back in a few minutes and hopefully we'll have it figured out.
                            `
                        }
                    </div>
            }
        </div>
    );
}

ProductList.propTypes = {
    productListItems: PropTypes.arrayOf(
        PropTypes.shape({
            imagePath: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    )
};

export default ProductList;
