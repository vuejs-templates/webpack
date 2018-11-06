import moment from 'moment'
export const deepCopy = (data) => JSON.parse(JSON.stringify(data))

export const noop = () => () => { }

export const isArray = (target) => {
  return toString.call(target) === '[object Array]'
}

export const isObject = (target) => {
  return toString.call(target) === '[object Object]'
}

export const isPromise = (target) => {
  return toString.call(target) === '[object Promise]'
}

export const isString = (target) => {
  return toString.call(target) === '[object String]'
}

export const isNumber = function (val) {
  let isNumberRes = true

  if (Number.isNaN(val)) {
    isNumberRes = false
  } else if (typeof val !== 'number') {
    isNumberRes = false
  }

  return isNumberRes
}

export const isUndefined = (target) => {
  return toString.call(target) === '[object Undefined]'
}

export const isFunction = (target) => {
  return toString.call(target) === '[object Function]'
}

export const isEmpty = (target) => {
  if (isUndefined(target)) {
    return true
  } else if (isString(target)) {
    return target.trim().length === 0
  } else if (isObject(target)) {
    return Object.keys(target).length === 0
  } else if (isArray) {
    return target.length === 0
  }
  return false
}

export const getDate = () => {
  let now = new Date()
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
}

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(param => {
        resolve(param)
      })
    } else {
      reject()
    }
  })
}
export const preArrayMultiple = (srcArr, column = 3, defaultValue = {}) => {
  let bigArr = []
  srcArr.forEach((el, i) => { // 把大数组分割成多个数组，每个数组有n项
    let index = parseInt(i / column)
    bigArr[index] = bigArr[index] ? bigArr[index] : []
    bigArr[index].push(el)
  })
  let last = bigArr.length - 1
  while (bigArr[last] && bigArr[last].length < column) { // 把最后一数组填满n项
    bigArr[bigArr.length - 1].push(defaultValue) // 默认填充
  }
  return bigArr
}
export const formatDate = (date, type) => {
  const typeObj = {
    'default': 'YYYY-MM-DD',
    'full': 'YYYY-MM-DD HH:mm:ss',
    'cn': 'YYYY年MM月DD日'
  }
  const formatValue = typeObj[type || 'default']
  return moment(date || new Date()).format(formatValue)
}
// 根据key从数组中筛选对象
export const findObjFromArray = (arr, key, keyName) => {
  return arr.find(item => item[keyName] === key)
}
// 格式化金额
export const formatMoney = (number, places, thousand, decimal) => {
  number = number || 0;
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  thousand = thousand || ',';
  decimal = decimal || '.';
  var negative = number < 0 ? '-' : '',
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '',
    j = (j = i.length) > 3 ? j % 3 : 0;
  return negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '');
}
// 金钱转数字
export const formatMoneyToNumber = (money) => {
  if (!isNumber(money)) {
    if (money.indexOf(',') > 0) {
      var reg = new RegExp(',', 'g'); // g,表示全部替换。
      money = money.replace(reg, '')
    }
    return parseFloat(money)
  }
  return money
}
