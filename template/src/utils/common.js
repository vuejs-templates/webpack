import _ from 'lodash'

export default {
  // 根据接口返回的菜单数进行数据塞选组合
  getAllLinkPath (menuList, obj = []) {
    let _this = this
    return menuList.reduce((dir, item) => {
      let o = {
        link: '/' + item.link,
        linkName: item.linkName,
        icon: item.icon,
        parentID: item.parentID,
        pkid: item.pkid
      }
      if (item.nextLevelMenu.length === 0) dir.push(o)
      if (item.nextLevelMenu.length > 0) {
        _this.getAllLinkPath(item.nextLevelMenu, dir)
      }
      return dir
    }, obj)
  },
  // 数组深拷贝
  deepCopy (o) {
    let _this = this
    if (o instanceof Array) {
      let n = []
      for (var i = 0; i < o.length; ++i) {
        n[i] = _this.deepCopy(o[i])
      }
      return n
    } else if (o instanceof Object) {
      let n = {}
      for (let i in o) {
        n[i] = _this.deepCopy(o[i])
      }
      return n
    } else {
      return o
    }
  },
  // 从数组Arra取出最小的数，并且不再Arrb中
  getMinRandomFromArray (Arra, Arrb) {
    let newArr = _.difference(Arra, Arrb)
    return newArr[0]
  },
  // 判断值是否为空
  isNull (v) {
    return v === undefined || v === null || v === ''
  },
  // 是否是图片
  isImage (fileName) {
    let suffixIndex = fileName.lastIndexOf('.')
    let suffix = fileName.substring(suffixIndex + 1).toUpperCase()
    let imageSuffixArr = ['BMP', 'JPG', 'JPEG', 'PNG', 'GIF']
    return imageSuffixArr.indexOf(suffix) >= 0
  },
  // 判断字符串类型
  isString (str) {
    return (typeof str === 'string') && str.constructor === String
  },
  // 判断是否是json字符串
  isJsonString (str) {
    try {
      if (typeof JSON.parse(str) === 'object') {
        return true
      }
    } catch (e) {
    }
    return false
  },
  // 获取cookie
  getCookie (name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return arr[2]
    } else {
      return null
    }
  },
  // 清除所有cookie函数
  deleteAllCookies () {
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i]
      let eqPos = cookie.indexOf('=')
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }
}
