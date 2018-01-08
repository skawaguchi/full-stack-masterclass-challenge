import React from 'react';
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
                    />)
            }
        </tbody>
    );
}

StoreListTableRow.propTypes = {
    storeList: MobXPropTypes.arrayOrObservableArray.isRequired
};

export default StoreListTableRow;
