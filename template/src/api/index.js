// 全局开启本地mock
const GlobalMock = true
let root = ''
export const isPro = () => process.env.NODE_ENV === 'production'
export const mock = process.env.MOCK
console.warn('mock model :::', mock)
if (isPro()) {
  root = '/api'
} else {
  root = '/testapi'
  // root = '/devapi'
}
let path = (inf = null, n) => {
  let result = ''
  if (isPro()) {
    result = root + inf
  } else {
    switch (mock) {
    case 'local':
      result = root + '/local' + inf
      break
    case 'cross':
      result = root + '/cross' + inf
      break
    case 'mixin':
      if (n||GlobalMock) {
        //result = root + '/local' + inf
        result = root + inf
      } else {
        result = root + '/cross' + inf
        // result = root + '/cross/api' + inf
      }
      break
    }
  }
  return result
}
/*
corss  请求远端
local  请求本地mock Json 文件

example:
export const login = path('/user/login')
*/
