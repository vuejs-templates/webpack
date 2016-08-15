# {{ name }}

> {{ description }}

支持两种方式访问apps中开发的应用:

1. 打包app，使用plugin引入远程js

    ```
    npm run apps
    // 访问 http://localhost:3000/#!/apps/hello
    ```

1. 直接使用vue引入的方式访问 (方便开发)

    ```
    // 需要在路由中增加配置
    // 访问 http://localhost:3000/#!/hello
    '/hello': {
        component: (resolve) => {
            require(['apps/hello/hello'], resolve);
        }
    }
    ```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build

# build 3rd party apps
npm run apps

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
