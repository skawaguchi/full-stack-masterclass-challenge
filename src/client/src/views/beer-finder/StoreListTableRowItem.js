import React from 'react';
import { PropTypes } from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { FormattedNumber } from 'react-intl';

function getAttribute(value) {
    return value !== null ? <div>{ value }</div> : null;
}

function StoreListTableRowItem(props) {
    return (
        <tr>
            <td className="distance">
                <FormattedNumber
                    maximumFractionDigits={1}
                    value={ props.item.distance }
                />
                <span className="unit-label">{'km'}</span>
            </td>
            <td className="quantity">
                <FormattedNumber
                    value={ props.item.quantity }
                />
            </td>
            <td className="store-info">
                { getAttribute(props.item.addressLine1) }
                { getAttribute(props.item.addressLine2) }
                { getAttribute(props.item.city) }
                <div>
                    <span className="store-label">{'Store #'}</span>
                    <span className="store-value">{ props.item.id }</span>
                </div>
            </td>
            <td className="hours"></td>
            <td className="telephone">
                { getAttribute(props.item.telephone) }
            </td>
        </tr>
    );
}

StoreListTableRowItem.propTypes = {
    item: PropTypes.shape({
        distance: PropTypes.number.isRequired
    })
};

export default StoreListTableRowItem;
