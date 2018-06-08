# vsiren-cli
> A Vue.js project Multiple Entry

# 目录结构说明
- 路由按目录划分，即每个页面对应一个文件夹，每个文件夹包含 index.js,
  main.vue。具体请参考demo
- 路由名称和文件夹保持一致(重要)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8100
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run createEntry
npm run createEntry target

# run mdev    run dev & mock
npm run mdev

# run all tests
npm test
```

# API MOCK
API : src/api/index.js

``` bash
export const I_HEALTHINFORM = path(healthInform)

export const I_HEALTHINFORM = path(healthInform， true)

true : local mock   mock data from service/mock

false: origin mock

open snap  dir path = service/snap

server/server.js  config origin host

example

var crosshost = 'https://easy-mock.com'

```
# multiple Entry
config  ./config/entry.json

``` bash
Entry url: http://localhost:9100/share.html#/

'/share/*': {
  必须把scheme 添加上，并在尾部附加上一个'/'才可行
  target: `http://localhost:9100/`,
  pathRewrite: {
    '^\/share(\/[a-zA-Z]+)?': '/share.html'
  }
}
```


