# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
{{#unit}}

# run unit tests
npm run unit
{{/unit}}
{{#e2e}}

# run e2e tests
npm run e2e
{{/e2e}}
{{#if_or unit e2e}}

# run all tests
npm test
{{/if_or}}
```

注意点：

1.新建的文件需要加上如下头部注释
```javascript
/*
 * @Author: markluo
 * @Date: 2017-11-30
 * @Last Modified by:
 * @Last Modified time:
 */
```

2.为了方便部署api加上了如下代码
```javascript
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
```

3.vue init 的时候会提醒是否安装element-ui

4.默认安装vuex，添加store文件夹

5.默认安装axios，使用志峰封装的APISERVER函数

6.关闭了我觉得不必要的eslint校验如下：
```
不强制在关键字前后使用一致的空格
不禁用行尾空格
不强制在注释中 // 或 /* 使用一致的空格
不要求或禁止使用分号
不强制在 function的左括号之前使用一致的空格
不强制 generator 函数中 * 号周围使用一致的空格
```
