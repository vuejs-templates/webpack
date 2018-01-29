import Axios from 'axios'
import example from './modules/example'

const modules = [example]

class GetData {
    constructor() {}

    sendAjax(options, params) {
        this.initInterceptor(options)
        if (options.method === 'post') {
            options.data = params
        } else {
            options.params = params
        }

        return Axios(options)
    }

    initInterceptor(options) {
        Axios.interceptors.request.handlers = []
        Axios.interceptors.response.handlers = []
        Axios.interceptors.request.use(options.req);
        Axios.interceptors.response.use(options.res);
    }
}

const injectFunction = function(constructor) {
    modules.forEach((value) => {
        for (let i in value) {
            constructor.prototype[i] = value[i]
        }
    })
}

injectFunction(GetData)

const api = function (Vue, options) {
    Vue.prototype.$getData = new GetData()
}

const getData = new GetData()

export {
    api, getData
}