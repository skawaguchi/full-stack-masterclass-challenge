import { get } from 'axios';

import { repoKey } from './repoKey';

export function getStores(productId, postalCode) {
    const repoUrl = 'http://lcboapi.com/stores';
    const params = {
        geo: postalCode,
        order: 'distance_in_meters',
        per_page: 100,
        product_id: productId
    };
    const config = {
        headers: {
            Authorization: `token ${repoKey}`
        },
        params
    };

    return get(repoUrl, config);
}
