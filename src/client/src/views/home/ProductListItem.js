import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import ProductImage from '../../components/ProductImage';
import BeerFinderLink from '../../components/BeerFinderLink';

import './ProductListItem.css';

function ProductListItem(props) {
    return (
        <div className="product-list-item">
            <Link
                className="product-link"
                to={ `/product/${props.id}` }
            >
                <div className="product-image-container">
                    <ProductImage
                        altText={ props.name }
                        imagePath={ props.imagePath}
                    />
                    <div className="suggestion-wrapper">
                        <div className="suggestion">
                            {'Get Details'}
                        </div>
                    </div>
                </div>
                <span className="product-name">{ props.name }</span>
            </Link>
            <BeerFinderLink id={ props.id }/>
        </div>
    );
}

ProductListItem.propTypes = {
    id: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    name: PropTypes.string.isRequired
};

export default ProductListItem;
