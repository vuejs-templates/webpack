let baseURL = null

if (process.env.NODE_ENV === 'development') {
    // URL = 'http://192.168.1.62:8080'
    baseURL = 'http://120.78.83.0'
} else {
    // URL = 'http://106.14.37.79:9001/'
    baseURL = 'http://120.78.149.117:8080'
}

export default baseURL