import { get } from 'axios';

export function getProducts() {
    const key = 'MDphYzU1NTBmZS1mMGMwLTExZTctYmI3ZS1kNzRiYjJiYWFjNzQ6eUVObmVRdnVCYmNLeFBPR0JWOFpqdjh5bDdmTkk2eUVzcmZ1';
    const repoUrl = 'http://lcboapi.com/products';
    const params = {
        per_page: 100,
        q: 'beaus',
        where: 'is_seasonal',
        where_not: 'is_dead'
    };
    const config = {
        headers: {
            Authorization: `token ${key}`
        },
        params
    };

    return get(
        repoUrl,
        config
    );
}
