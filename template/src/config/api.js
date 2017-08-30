/**
 * backend apis
 */
import {get as getConf} from 'conf/global'

let apiBase = null

const _dataPath = (url) => {
    apiBase = apiBase || getConf().apiBase
    return `${apiBase}/${url}`
}

export default {
    USER_INFO: _dataPath('user')
}
