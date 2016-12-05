# vue-webpack-boilerplate

> webpack + vue 启动模板

安装方式
```
vue init lkiarest/webpack#app my-project
```

## Documentation

> 支持在一个项目中发布多个独立应用或单个应用

1. apps目录下包含多个应用(hello1, hello2)

    打包后会在dist中生成多个独立的app发布目录，使用app名称区分。

    ```
    npm run build
    ./startup.bat #启动http server
    // 访问 http://localhost:3000/hello1/index.html
    // 访问 http://localhost:3000/hello2/index.html
    ```

1. apps目录下包含单个应用(hello1)

    打包后会在dist中生成独立的发布目录，直接放在根目录下。
    ```
    npm run build
    ./startup.bat #启动http server
    // 访问 http://localhost:3000/index.html
    ```

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init lkiarest/webpack#app my-project
$ cd my-project
$ npm install
$ npm run dev # dev mode
$ npm run build # publish mode
```