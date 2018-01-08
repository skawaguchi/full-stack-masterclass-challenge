import React from 'react';
import { PropTypes } from 'prop-types';
import { PropTypes as MobXPropTypes } from 'mobx-react';

import StoreListTableRows from './StoreListTableRows';

function StoreListTable(props) {
    return (
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
            <StoreListTableRows
                postalCode={ props.postalCode }
                storeList={ props.storeList }
            />
        </table>
    );
}

StoreListTable.propTypes = {
    postalCode: PropTypes.string.isRequired,
    storeList: MobXPropTypes.arrayOrObservableArray.isRequired
};

export default StoreListTable;
