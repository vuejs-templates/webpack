import http from 'utils/http'

let confPath = 'statics/global.conf.json'

let cached = null

let cnt = 0

export const getConf = () => {
    if (cached) {
        return Promise.resolve(cached)
    }

    return http.getJson(confPath + '?_t=' + cnt++).then(data => {
        cached = data
        return data
    })
}
