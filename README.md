# ZA-INS Vue-Webpack Template

> 基于`vue-template`修改，额外添加了多入口，本地mock等功能，另外配合多个子模块，可以快速实现项目原型搭建
> 项目脚手架基于`vsiren`项目改造，了解[visiren](https://github.com/freezestanley/vsiren/tree/scaf-less)
> 点此了解 [vue-template](https://github.com/vuejs-templates/webpack)

## 使用

``` bash
$ npm install -g vue-cli
$ vue init za-Ins/webpack my-project
$ cd my-project
$ npm install
$ npm run dev
```
## 本地 Mock
- 在 `/service/mock` 目录下，按接口路径建立目录结构，
> 比如api为: /api/login/submit. 则对应的mock数据应该存在放`/service/mock/api/login/submit.json`

- 表单组件依赖于另外一个组件包 [vformer](https://github.com/jankergg/vform)
