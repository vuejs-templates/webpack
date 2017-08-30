import {getUserInfo, getTenantInfo, gotoLoginPage} from 'utils/sdk'
import {getConf} from 'services/config.service'

let conf = {}

export const load = () => {
    return getUserInfo().then(data => {
        if (!data) { // 未登录，跳转到登陆页面
            gotoLoginPage()
            throw new Error('not login')
        }

        Object.assign(conf, {user: data})
        return conf
    }).then(getConf).then(data => {
        Object.assign(conf, data)
    }).then(getTenantInfo).then(data => {
        let tenantId = data && data.id || ''
        let profile = conf.schoolProfiles[tenantId]

        Object.assign(conf, {tenantId}, profile)
        return conf
    })
}

export const get = () => {
    return conf
}
