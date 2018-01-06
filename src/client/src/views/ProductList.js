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
                        />
                    )) :
                    <div className='no-products'>
                        {'No products were found.'}
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
