import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import ProductImage from '../components/ProductImage';

function ProductListItem(props) {
    return (
        <div className="product-list-item">
            <ProductImage
                altText={ props.name }
                imagePath={ props.imagePath}
            />
            <Link to={ `/product/${props.productNumber}` }>
                { props.name }
            </Link>
        </div>
    );
}

ProductListItem.propTypes = {
    imagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    productNumber: PropTypes.string.isRequired
};

export default ProductListItem;
