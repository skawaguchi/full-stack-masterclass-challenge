import React from 'react';
import { PropTypes } from 'prop-types';
import { FormattedNumber } from 'react-intl';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
    faBeer,
    faBus,
    faCar,
    faWheelchair
} from '@fortawesome/fontawesome-free-solid';

import StoreHours from './StoreHours';

function getAttribute(value) {
    return value !== null ? <div>{ value }</div> : null;
}

function getDirectionClickHandler(props) {
    return () => {
        const domain = 'https://www.google.com';
        const path = 'maps/dir';
        const userLocation = props.postalCode;
        const address = `${props.item.addressLine1} ${props.item.addressLine1}`;
        const fullAddress = `${address} ${props.item.city} Ontario ${props.item.postalCode}`;
        const fullPath = `${domain}/${path}/${userLocation}/${fullAddress}`;

        window.open(fullPath, 'directions');
    };
}

const iconMap = {
    beerColdRoom: {
        className: 'beer-cold-room',
        icon: faBeer,
        titleText: 'This location has a beer cold room'
    },
    parking: {
        className: 'parking',
        icon: faCar,
        titleText: 'This location has parking'
    },
    transitAccess: {
        className: 'transit-access',
        icon: faBus,
        titleText: 'This location has transit access'
    },
    wheelchairAccess: {
        className: 'wheelchair-access',
        icon: faWheelchair,
        titleText: 'This location has wheelchair access'
    }
};

function getIcon(hasIcon, key) {
    const {
        className,
        icon,
        titleText
    } = iconMap[key];

    return hasIcon ?
        <span
            className={ className }
            title={ titleText }
        >
            <FontAwesomeIcon
                icon={ icon}
            />
        </span> :
        null;
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
                <div className="icons">
                    { getIcon(props.item.hasWheelchairAccess, 'wheelchairAccess') }
                    { getIcon(props.item.hasTransitAccess, 'transitAccess') }
                    { getIcon(props.item.hasParking, 'parking') }
                    { getIcon(props.item.hasBeerColdRoom, 'beerColdRoom') }
                </div>
            </td>
            <td className="store-hours">
                <StoreHours storeHours={ props.item.storeHours }/>
            </td>
            <td className="telephone">
                { getAttribute(props.item.telephone) }
            </td>
            <td className="directions">
                <button onClick={ getDirectionClickHandler(props) }>{'Get Directions'}</button>
            </td>
        </tr>
    );
}

StoreListTableRowItem.propTypes = {
    item: PropTypes.shape({
        addressLine1: PropTypes.string.isRequired,
        addressLine2: PropTypes.string,
        city: PropTypes.string.isRequired,
        distance: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        hasBeerColdRoom: PropTypes.bool.isRequired,
        hasParking: PropTypes.bool.isRequired,
        hasTransitAccess: PropTypes.bool.isRequired,
        hasWheelchairAccess: PropTypes.bool.isRequired,
        quantity: PropTypes.number.isRequired,
        storeHours: PropTypes.object.isRequired,
        telephone: PropTypes.string.isRequired
    }),
    postalCode: PropTypes.string.isRequired
};

export default StoreListTableRowItem;
