import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';

import CloseLink from '../../components/CloseLink';
import StoreListTableRows from './StoreListTableRows';

import './BeerFinderContent.css';

@inject('productListStore', 'storeListStore')
@observer
class BeerFinderContent extends Component {
    render() {
        const productName = this.props.productListStore.getProductName(this.props.productId);
        const storeList = this.props.storeListStore.getStoresByDistance();

        return (
            <section className="beer-finder">
                <CloseLink/>
                <Link to={`/product/${this.props.productId}`}>
                    <FontAwesomeIcon icon={ faArrowLeft }/>
                    <span className="back-label">{ 'Back to Product Details' }</span>
                </Link>
                <h1>
                    <span className="search-label">{ 'You searched for' }</span>
                    <span className="product-name">{ productName }</span>
                </h1>
                <div className="controls">
                    <span className="search-label">{ 'Search by Postal Code' }</span>
                    <input
                        type="text"
                        value={ this.props.storeListStore.postalCode }
                    />
                </div>
                <table className="store-list">
                    <thead>
                        <tr>
                            <th>{'Distance'}</th>
                            <th>{'In Stock'}</th>
                            <th>{'Store Info'}</th>
                            <th>{'Hours'}</th>
                            <th>{'Telephone'}</th>
                            <th>{'Directions'}</th>
                        </tr>
                    </thead>
                    <StoreListTableRows storeList={ storeList }/>
                </table>
            </section>
        );
    }
}

BeerFinderContent.wrappedComponent.propTypes = {
    productId: PropTypes.string.isRequired,
    productListStore: PropTypes.shape({
        getProductName: PropTypes.func.isRequired
    }),
    storeListStore: PropTypes.shape({
        getStoresByDistance: PropTypes.func.isRequired
    })
};

export default BeerFinderContent;
