import { get } from 'axios';

import { repoKey } from './repoKey';

export function getStores(productId) {
    const repoUrl = 'http://lcboapi.com/stores';
    const params = {
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
