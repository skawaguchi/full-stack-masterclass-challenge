import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import ProductImage from '../components/ProductImage';
import BeerFinderLink from '../components/BeerFinderLink';

function ProductListItem(props) {
    return (
        <div className="product-list-item">
            <ProductImage
                altText={ props.name }
                imagePath={ props.imagePath}
            />
            <Link to={ `/product/${props.id}` }>
                { props.name }
            </Link>
            <BeerFinderLink id={ props.id }/>
        </div>
    );
}

ProductListItem.propTypes = {
    id: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default ProductListItem;
