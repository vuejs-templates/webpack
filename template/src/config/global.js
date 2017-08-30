import {getConf} from 'services/config.service'

let conf = {}

export const load = () => {
    return getConf().then(data => {
        Object.assign(conf, data)
        return conf
    })
}

export const get = () => {
    return conf
}
