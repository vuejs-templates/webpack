import fetch from '../utils/fetch';

export function testRequest (id) {
    return fetch({
        url: process.env.BASE_API + '/jeegoldenhome/jrest/goldenhomecrm/dictApi/getDictList?type=' + id,
        method: 'get'
    });
}

export function request (params) {
    return fetch({
        url: process.env.BASE_API + '/grs/guors',
        method: 'post',
        data: params
    });
}
