/*
 * @Author: zhangxiang
 * @Date: 2018/9/18
 * @Last Modified by: zhangxiang
 * @Last Modified time: 2018/9/18
 */
let PURCHASE_BASE_URL, TICKET_BASE_URL, TICKET_EXTERNAL_URL
let host = window.location.host
if (host.match(/ut\.tuhu\.cn$/)) { // UT环境
  PURCHASE_BASE_URL = 'https://purchaseapiut.tuhu.cn/'
  TICKET_BASE_URL = 'https://ticketyewuapiut.tuhu.cn/'
  TICKET_EXTERNAL_URL = 'https://ticket-external-api-ut.tuhu.cn/'
} else {
  if (host.match(/\.tuhu\.cn$/)) { // 线上环境
    PURCHASE_BASE_URL = 'https://purchaseapi.tuhu.cn/'
    TICKET_BASE_URL = 'https://ticketyewuapi.tuhu.cn/'
    TICKET_EXTERNAL_URL = 'https://ticket-external-api.tuhu.cn/'
  } else if (host.match(/\.tuhu\.work$/)) { // WORK环境
    PURCHASE_BASE_URL = 'https://purchaseapi.tuhu.work/'
    TICKET_BASE_URL = 'https://ticketyewuapi.tuhu.work/'
    TICKET_EXTERNAL_URL = 'https://ticket-external-api.tuhu.work/'
  } else { // DEV环境
    PURCHASE_BASE_URL = 'https://purchaseapi.tuhu.work/'
    TICKET_BASE_URL = 'https://ticketyewuapi.tuhu.work/'
    TICKET_EXTERNAL_URL = 'https://ticket-external-api.tuhu.work/'
  }
}

export default {
  LogOn: `${TICKET_BASE_URL}api/Account/LogOn`, // 登录
}
