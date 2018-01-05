import { get } from 'axios';

export function getProducts() {
    const repoUrl = 'http://lcboapi.com/products';
    const params = {
        q: 'beau\'s',
        where: 'is_seasonal',
        where_not: 'is_dead'
    };

    return get(repoUrl, params);
}
