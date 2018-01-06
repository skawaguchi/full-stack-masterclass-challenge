import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import './ProductImage.css';

function setError() {
    this.setState({
        showPlaceHolder: true
    });
}

class ProductImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPlaceHolder: false
        };

        this.setError = setError.bind(this);
    }

    componentWillMount() {
        if (this.props.imagePath === null) {
            this.setState({
                showPlaceHolder: true
            });
        }
    }

    render() {
        return (
            this.state.showPlaceHolder ?
                <div className='image-error'>
                    {'No Image Available'}
                </div> :
                <img
                    alt={ this.props.altText }
                    className="product-image"
                    onError={ this.setError }
                    src={ this.props.imagePath }
                />
        );
    }
}

ProductImage.propTypes = {
    altText: PropTypes.string.isRequired,
    imagePath: PropTypes.string
};

export default ProductImage;
