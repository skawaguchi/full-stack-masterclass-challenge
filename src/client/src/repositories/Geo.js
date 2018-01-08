import { get } from 'axios';

export function getGeo() {
    const repoUrl = 'https://freegeoip.net/json/';

    return get(repoUrl);
}
