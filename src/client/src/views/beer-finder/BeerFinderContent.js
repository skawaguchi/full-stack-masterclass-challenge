import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { DebounceInput } from 'react-debounce-input';

import CloseLink from '../../components/CloseLink';
import StoreListTable from './StoreListTable';

import './BeerFinderContent.css';

function getPostalCodeChangeHandler(props) {
    return (event) => {
        const newPostalCode = event.target.value;

        props.storeListStore.refreshStores(props.productId, newPostalCode);
    };
}

@inject('productListStore', 'storeListStore')
@observer
class BeerFinderContent extends Component {
    render() {
        const productName = this.props.productListStore.getProductName(this.props.productId);
        const invalidClass = this.props.storeListStore.isValidPostalCode ? '' : 'invalid';

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
                    <DebounceInput
                        className={ invalidClass }
                        onChange={ getPostalCodeChangeHandler(this.props) }
                        placeholder="A1A 2B2 or A1A"
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
        isValidPostalCode: PropTypes.bool.isRequired,
        postalCode: PropTypes.string.isRequired,
        refreshStores: PropTypes.func.isRequired,
        storeList: MobXPropTypes.arrayOrObservableArray.isRequired
    })
};

export default BeerFinderContent;
