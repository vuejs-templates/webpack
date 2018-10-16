let PURCHASE_HOST
let host = window.location.host
if (host.match(/ut\.tuhu\.cn$/)) { // UT环境
  PURCHASE_HOST = 'https://purchaseapiut.tuhu.cn'
} else {
  if (host.match(/\.tuhu\.cn$/)) { // 线上环境
    PURCHASE_HOST = 'https://purchaseapi.tuhu.cn'
  } else if (host.match(/\.tuhu\.work$/)) { // WORK环境
    PURCHASE_HOST = 'https://purchaseapi.tuhu.work'
  } else { // DEV环境
    PURCHASE_HOST = 'https://purchaseapi.tuhu.work'
  }
}

export default {
  getMenuList: `${PURCHASE_HOST}/menu/getMenuList`, // 获取左菜单接口

  // demo页面接口
  getOperatingActivityList: `${PURCHASE_HOST}/api/operatingActivity/getOperatingActivityList`
}
