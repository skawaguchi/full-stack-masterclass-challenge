import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import './ProductImage.css';

function setError() {
    this.setState({
        hasError: true
    });
}

class ProductImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };

        this.setError = setError.bind(this);
    }

    render() {
        return (
            this.state.hasError ?
                <div className='image-error'>
                    {'No Image Available'}
                </div> :
                <img
                    alt={ this.props.altText }
                    className="product-image"
                    onError={ this.setError }
                    src={this.props.imagePath}
                />
        );
    }
}

ProductImage.propTypes = {
    altText: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
};

export default ProductImage;
