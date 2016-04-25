/**
 * Created by hq5544 on 16/4/6.
 */
import utils from '../tools/utils'

const ajaxJson = utils.ajaxJson
// form 格式的就引入 utils.ajaxForm

export default {
    // demo api
    demo (type, username, password, code) {
        const param = {}
        param.type = type
        param.username = username
        param.password = password
        param.imgrc = code
        return ajaxJson('demo/demo', param)
    }
}
