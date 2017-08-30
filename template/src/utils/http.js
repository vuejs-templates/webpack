/**
 * http utils, provide general check for http response
 */

axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

const checkHttp = (res) => {
    if (!res) {
        let errObj = {
            message: '响应数据为空',
            response: null
        }

        throw errObj
    }

    let status = res.status
    if (status === 200) {
        return res.data || {}
    }

    let errObj = {
        message: '请求错误',
        response: res
    }

    throw errObj
}

const checkResult = (res) => {
    let data = checkHttp(res)
    if (data.errCode == '0') { // TODO: defined according to your business
        return data
    }

    let errObj = {
        message: data.errMsg || '请求错误',
        response: res
    }

    throw errObj
}

export const get = (url, params) => {
    return axios.get(url, {params, data: {}}).then(checkResult)
}

export const post = (url, data) => {
    return axios.post(url, data).then(checkResult)
}

/**
 * raw json request
 */
export const getJson = (url, data) => {
    return axios.get(url, data).then(checkHttp)
}

export default {get, post, getJson}
