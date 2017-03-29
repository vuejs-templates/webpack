/**
 * @module service 示例
 * axios 用法请参考 https://github.com/mzabriskie/axios
 */
import api from 'api'

export const getInfo = (info) => {
    return axios.post(api.USER_INFO, info)
}
