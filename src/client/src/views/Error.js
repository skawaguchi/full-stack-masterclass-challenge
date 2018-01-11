import React from 'react';

import './Error.css';

function Error() {
    return (
        <section className="error-view">
            <img
                alt="Don't cry over spilt beer"
                src="/spilled-beer.png"
            />
            <p>
                { `
                Oh noes! We couldn't load the LCBO data!
                Please try again later.
                `
                }
            </p>
        </section>
    );
}
export default Error;
