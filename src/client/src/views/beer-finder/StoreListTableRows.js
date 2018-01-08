import React from 'react';
import { PropTypes } from 'prop-types';
import { PropTypes as MobXPropTypes } from 'mobx-react';

import StoreListTableRowItem from './StoreListTableRowItem';

function StoreListTableRow(props) {
    return (
        <tbody>
            {
                props.storeList.map((item) =>
                    <StoreListTableRowItem
                        item={ item }
                        key={ item.id }
                        postalCode={ props.postalCode }
                    />)
            }
        </tbody>
    );
}

StoreListTableRow.propTypes = {
    postalCode: PropTypes.string.isRequired,
    storeList: MobXPropTypes.arrayOrObservableArray.isRequired
};

export default StoreListTableRow;
