import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';

import CloseLink from '../../components/CloseLink';
import StoreListTable from './StoreListTable';

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
                {
                    this.props.storeListStore.storeList.length > 0 ?
                        <StoreListTable
                            postalCode={ this.props.storeListStore.postalCode }
                            storeList={ this.props.storeListStore.storeList }
                        /> :
                        <div className="no-stores-message">
                            {
                                'Oh noes! We couldn\'t find a store with this beer!'
                            }
                        </div>
                }

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
        storeList: MobXPropTypes.arrayOrObservableArray.isRequired
    })
};

export default BeerFinderContent;
