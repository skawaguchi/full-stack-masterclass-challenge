import React from 'react';
import { PropTypes } from 'prop-types';

import ProductImage from '../components/ProductImage';

function ProductListItem(props) {
    return (
        <div className="product-list-item">
            <ProductImage
                altText={ props.name }
                imagePath={ props.imagePath}
            />
            <div className="name">
                { props.name }
            </div>
        </div>
    );
}

ProductListItem.propTypes = {
    imagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default ProductListItem;
