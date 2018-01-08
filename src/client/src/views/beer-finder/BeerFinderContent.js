import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';

import CloseLink from '../../components/CloseLink';

import './BeerFinderContent.css';

@inject('productListStore', 'storeListStore')
@observer
class BeerFinderContent extends Component {
    render() {
        const productName = this.props.productListStore.getProductName(this.props.productId);

        return (
            <section className="beer-finder">
                <CloseLink/>
                <Link to={`/product/${this.props.productId}`}>
                    <FontAwesomeIcon icon={ faArrowLeft }/>
                    <span className="back-label">{ 'Back to Product Details' }</span>
                </Link>
                <h1>
                    <span className="search-label">{ 'You searched for:' }</span>
                    <span className="product-name">{ productName }</span>
                </h1>
            </section>
        );
    }
}

BeerFinderContent.wrappedComponent.propTypes = {
    productId: PropTypes.string.isRequired,
    productListStore: PropTypes.shape({
        getProductName: PropTypes.func.isRequired
    })
};

export default BeerFinderContent;
