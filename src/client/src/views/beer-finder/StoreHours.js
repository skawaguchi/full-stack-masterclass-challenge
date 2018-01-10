import React from 'react';
import { PropTypes } from 'prop-types';
import { DateTime } from 'luxon';

const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
];
const format = 'h:mm a';

function getDisplayedTime(hour, minute) {
    return DateTime.fromObject({
        hour,
        minute
    }).toFormat(format);
}

function getHoursMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes - (hours * 60);

    return getDisplayedTime(hours, minutes);
}

function getTimeForDay(storeHours, day) {
    const dayHours = storeHours[day];
    const open = getHoursMinutes(dayHours.open);
    const close = getHoursMinutes(dayHours.close);

    return `${open} - ${close}`;
}

function getDisplayedHours(storeHours) {
    return days.reduce((accumulator, day) => {
        accumulator[day] = getTimeForDay(storeHours, day);

        return accumulator;
    }, {});
}

function getDayElement(label, classNaem, value) {
    return (
        <div className={ classNaem }>
            <dt>{ label }</dt>
            <dd>{ value }</dd>
        </div>
    );
}

function StoreHours(props) {
    const {
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday
    } = getDisplayedHours(props.storeHours);

    return (
        <dl className="store-hours">
            { getDayElement('Sun', 'sunday', sunday) }
            { getDayElement('Mon', 'monday', monday) }
            { getDayElement('Tue', 'tuesday', tuesday) }
            { getDayElement('Wed', 'wednesday', wednesday) }
            { getDayElement('Thu', 'thursday', thursday) }
            { getDayElement('Fri', 'friday', friday) }
            { getDayElement('Sat', 'saturday', saturday) }
        </dl>
    );
}

StoreHours.propTypes = {
    storeHours: PropTypes.shape({
        sunday: PropTypes.object.isRequired,
        monday: PropTypes.object.isRequired,
        tuesday: PropTypes.object.isRequired,
        wednesday: PropTypes.object.isRequired,
        thursday: PropTypes.object.isRequired,
        friday: PropTypes.object.isRequired,
        saturday: PropTypes.object.isRequired
    })
};

export default StoreHours;
