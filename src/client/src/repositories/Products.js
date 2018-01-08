import { get } from 'axios';

import { repoKey } from './repoKey';

export function getProducts() {
    const repoUrl = 'http://lcboapi.com/products';
    const params = {
        per_page: 100,
        q: 'beaus',
        where: 'is_seasonal',
        where_not: 'is_dead'
    };
    const config = {
        headers: {
            Authorization: `token ${repoKey}`
        },
        params
    };

    return get(repoUrl, config);
}
