import baseURL from '../ip-config/main'
export default {
    // `method` is the request method to be used when making the request
    method: 'get', // default

    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: baseURL,

    req: function(config) {
        // Do something before request is sent
        console.log('发送的数据', config.params || config.data)
        return config;
    },

    res: function (response) {
        // Do something with response data
        console.log('返回的数据', response)
        // if(response.data.code == 1000) {
        //     return response.data.data
        // } else {
        //     return Promise.reject(response.data);
        // }
        return response;
    },

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 3000,

    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default

    // `validateStatus` defines whether to resolve or reject the promise for a given
    // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
    // or `undefined`), the promise will be resolved; otherwise, the promise will be
    // rejected.
    validateStatus: function (status) {
        return status === 200 // default
    }
}
