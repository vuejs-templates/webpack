import mainConfig from '../config/main'

export default {
    test(params) {
        let config = {
            url: '/test',
            method: 'get'
        }

        this.sendAjax({...config, ...mainConfig}, params)
    }
}