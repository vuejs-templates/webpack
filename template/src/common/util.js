/*
 * util helper methods
 */
export default {
  regexpMap: {
    regexp_mobile: /^1[3|4|5|7|8]\d{9}$/, // 手机校验
    regexp_name_cn: /^([\u4e00-\u9fa5]{2,8})$/, // 中文姓名校验
    regexp_name_en: /^([A-Z]+\s?[A-Z]*\s?[A-Z]*)$/i, // 英文姓名校验
    regexp_captcha: /^\d{6}$/, // 验证码校验
    car_plate_number: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9\u4e00-\u9fa5]{1}$/i, // 车牌号校验
    regexp_vin: /^[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{2}\d{6}$/i, // 车架号
    regexp_car_mileage: /\d+/, // 里程
    regexp_coupon_code: /^\d{12}$/, // 优惠券
    regexp_decimals: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/ // 支持两位小数
  },
  /**
   * 计时器
   */
  sendCaptcha(timer) {
    if (timer.seconds-- > 0) {
      timer.text = '剩余: ' + timer.seconds + ' 秒'
      clearTimeout(timer.secondsTimer)
      timer.secondsTimer = setTimeout(() => {
        this.sendCaptcha(timer)
      }, 1000)
    } else {
      clearTimeout(timer.secondsTimer)
      timer.secondsTimer = null
      timer.text = '获取验证码'
    }
  },
  // 判断一个时间是否在指定的时间当中 bt=8:00:00,et=20:00:00,rt=2016-11-11 9:23:23
  timeInBettwen(bt, et, rt) {
    let placeholder = '2016-11-11 '
    let reg = /[^\s]*\s?([^.]*)\.?.*/
    let aRt = rt.replace(reg, '$1').split(':')
    let nRt = aRt[0] * 3600 + aRt[1] * 60 + aRt[2] * 1

    let aBt = (placeholder + bt).replace(reg, '$1').split(':')
    let nBt = aBt[0] * 3600 + aBt[1] * 60 + aBt[2] * 1

    let aEt = (placeholder + et).replace(reg, '$1').split(':')
    let nEt = aEt[0] * 3600 + aEt[1] * 60 + aEt[2] * 1
    return nBt <= nRt && nRt <= nEt
  },
  /**
   * 判断两个时间相差多少
   * @param t1 {String/Date} 时间1
   * @param t2 {String/Date} 时间2
   * @param offset {number} 偏差，单位是毫秒
   */
  diffTime(t1, t2, offset) {
    if (typeof t1 === 'string') {
      t1 = new Date(t1.replace(/-/g, '/'))
    }
    if (typeof t2 === 'string') {
      t2 = new Date(t2.replace(/-/g, '/'))
    }
    offset = offset || 0
    let r = t1.getTime() - t2.getTime() - offset
    return r
  },
  /**
   * 得到将来的某个日期
   * @param str 创建订单时间
   * @param days 失效时间
   * @returns {Date}
   */
  getEndTime(str, days) {
    var date = new Date(str.replace(/-/g, '/'))
    date.setDate(date.getDate() + days)
    return date
  },
  /**
   * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * 例子：
   * formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
   * formatTime(new Date(), 'yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
   * 参照：http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html
   */
  formatTime(time, fmt) {
    if (typeof time === 'string') {
      time = time.replace(/-/g, '/')
      time = new Date(time)
    }
    let o = {
      'M+': time.getMonth() + 1, // 月份
      'd+': time.getDate(), // 日
      'h+': time.getHours(), // 小时
      'm+': time.getMinutes(), // 分
      's+': time.getSeconds(), // 秒
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      'S': time.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}
