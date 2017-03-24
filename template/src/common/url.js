/**
 * url help methods
 */
export default {
  /**
   * 获取 location.search和location.hash的值
   * @returns [Object] 对象
   */
  getSearch() {
    let hash = window.location.hash
    let index = hash.indexOf('?')
    let o = {}
    let item
    let searchs = [window.location.search, index !== -1 ? hash.substr(index) : '']
    searchs.forEach(search => {
      if (search) {
        search = search.substr(1).split('&')
        // for (var i = 0, len = search.length; i < len; i++) {
        //   item = search[i].split('=')
        //   o[item[0]] = item[1]
        // }
        search.forEach(val => {
          item = val.split('=')
          o[item[0]] = item[1]
        })
      }
    })
    return o
  },
  /**
   * @param {Object} param 将要转为URL参数字符串的对象
   * @param {Object} key URL参数字符串的前缀
   * @param {Boolean} encode true/false 是否进行URL编码,默认为true
   * @source http://www.tuicool.com/articles/uaIr2mj
   * return URL参数字符串
   */
  urlEncode(param, key, encode) {
    if (param == null) {
      return ''
    }
    if (!key) {
      key = ''
    }
    var paramStr = ''
    var t = typeof (param)
    if (t === 'string' || t === 'number' || t === 'boolean') {
      paramStr += '&' + key + '=' + ((encode === null || encode) ? window.encodeURIComponent(param) : param)
    } else {
      for (var i in param) {
        var k = key === null ? i : key + (param instanceof Array ? '-' + i + '-' : i)
        paramStr += this.urlEncode(param[i], k, encode)
      }
    }
    return paramStr
  }
}
