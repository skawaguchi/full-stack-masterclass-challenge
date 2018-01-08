import React from 'react';
import { PropTypes } from 'prop-types';

import StoreListTableRowItem from './StoreListTableRowItem';

function StoreListTableRow(props) {
    return (
        <tbody>
            {
                props.storeList.map((item) =>
                    <StoreListTableRowItem
                        item={ item }
                        key={ item.id }
                    />)
            }
        </tbody>
    );
}

StoreListTableRow.propTypes = {
    storeList: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired
};

export default StoreListTableRow;
