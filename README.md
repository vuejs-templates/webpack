## 项目说明
基于 vue2.0 的前端开发环境，用于前后端分离后的移动单页应用开发。可使用`ES6`、`Less`、`fontface`等。

## 新增的特性

- 结构清晰的代码框架设计
- 本地sever.
- 开发阶段数据模拟或者代理后端接口
- 内置log插件(vconsole)
- 多环境支撑
- 内置了ajax(通信)、event(事件)、router(路由)、throttle(节流)、存储、延迟300ms等等处理方式
- 移动适配方案
- poscss自动处理`px` To `rem`、autoprefixer自动根据css属性添加低版本浏览器前缀。无视浏览器兼容问题 
- 生成zip压缩文件
## 目录说明
```
│  index.html                     入口页面
│  package.json                   包配置文件
│  README.md                      项目说明
├─build                           构建脚本目录
│      build.js                         生产环境构建脚本
│      check-versions.js                
│      dev-client.js                    开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
│      dev-server.js                    本地服务器
│      utils.js                         构建相关工具方法
│      vue-loader.conf.js               .vue文件处理
│      webpack.base.conf.js             wabpack基础配置
│      webpack.dev.conf.js              wabpack开发环境配置
│      webpack.prod.conf.js             wabpack生产环境配置
│      zip.js                          把编译后的资源打包成zip包
├─config                           项目配置
│      dev.env.js                       开发环境变量
│      index.js                         项目配置文件
│      postcss.js                       postcss配置文件
│      prod.env.js                      生产环境变量
├─mock                             数据模拟目录
│      define.js                        本地接口数据定义
│      headers.js                       模拟app里面的用户信息
│      index.js                         接口处理文件
└─src                              项目源码目录
    │  App.vue                          根组件
    │  main.js                          入口js文件
    ├─assets                       资源目录
    │  ├─css                            样式
    │  │      base.less                     基础样式
    │  │      fontface.less                 fontface定义
    │  │      mixins.less                   mixin定义
    │  │      reset.less                    reset定义
    │  ├─images                         
    │  └─js                             js
    │          common.js                    基础js，里面有全局命名空间，环境判断等
    ├─components                   公共组件目录
    ├─define                       业务定义目录
    │      globalVar.js                 公共定义
    │      urlDefine.js                 url定义
    ├─events                       事件处理目录
    │      eventBus.js
    │      eventMsg.js                  事件名称定义
    │      systemEvent.js               事件调度器
    ├─router                        前端路由目录
    │      router.js                    路由定义
    │      routerInstance.js            路由实例配置
    │      routerManager.js             路由跳转管理
    ├─util                          可能用到的业务相关的方法
    │      ajax.js                      通信
    │      appInterFace.js              app接口封装
    │      dom.js                       dom的基本操作
    │      merge.js                     对象合并
    │      randomUtil.js                随机数
    │      requestAnimationFrame.js     定时
    │      storage.js                   存储
    │      throttle.js                  节流
    │      timeDown.js                  倒计时
    │      url.js                       url处理
    └─view                          页面组件目录

```


## 使用

假设你已经安装了 `vue-cli2.0`并按照项目规范来生成项目目录了。

看图来的快

![image](https://github.com/ct-fed/ctyapp_h5build/blob/master/assets/vue-cli.gif)

## 命令

**本地**

```
npm run dev

```
**测试版**

```
npm run test
```

**生产环境**

```
npm run build
```

**打包zip文件**

```
npm run zip
```

## 数据mock说明

本地web服务是基于express搭建的。并通过中间件的形式模拟了后端的接口，无需等待后端接口的完成。具体接口的数据返回定义在`mock`目录下的`define.js`中定义，其他无需关心。如果后端接口已经完成，需要在本地联调后端接口。其`server`有提供了代理功能，可以解决跨域问题。只需要在`define.js`中配置`isProxy`为`true||false`即可。

## log说明

1、由于移动调试比较麻烦，内置了`vconsole`。此插件只集成在测试环境中，方便快速的查看代码中的log。
2、正式环境不希望log显示，所以代码中做了拦截，对log进行了重写。如果正式环境想要查看，可通过当前的`url?debug=1`的方式来开启log。

## 组件说明

业务中的公共组件放在`components`目录中。路由组件放在`view`目录中