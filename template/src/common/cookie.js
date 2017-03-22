/**
 * cookie helper method
 */
export default {
  getCookie (name) {
    let c = document.cookie
    if (c.length > 0) {
      let s = c.indexOf(name + '=')
      if (s !== -1) {
        s = s + name.length + 1
        let e = c.indexOf(';', s)
        if (e === -1) {
          e = c.length
        }
        return unescape(c.substring(s, e))
      }
    }
    return ''
  }
}
