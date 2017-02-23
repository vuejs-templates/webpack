##新增的特性

- 结构清晰的代码框架设计
- 本地sever.
- 开发阶段数据模拟或者代理后端接口
- 内置log插件(vconsole)
- 多环境支撑
- 内置了ajax(通信)、event(事件)、router(路由)、throttle(节流)、存储、延迟300ms等等处理方式
- 移动适配方案
- poscss自动处理`px` To `rem`、autoprefixer自动根据css属性添加低版本浏览器前缀。无视浏览器兼容问题 
- 生成zip压缩文件

##使用

假设你已经安装了 `vue-cli2.0`并按照项目规范来生成项目目录了。

先看图吧

{{:h5:vue-cli.gif}}


##命令

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

##目录结构说明

```
   build                  >> 项目构建的需要用的js文件
   
   config                 >> 项目构建的配置目录
   
   mock                   >> 数据模拟目录
     define.js               >>定义接口返回值
     header.js               >>定义模拟app里面的消息头。
     index.js                >>数据模拟和代理的核心文件
     
   src                    >> 项目开发目录
     assets                  >>项目中无法抽象成组件或者模块的静态资源文件
     components              >>组件目录
     define               >>业务逻辑中定义的配置目录
       globalVal.js          >>全局配置 
       urlDefine.js          >>Url相关的配置 
     events               >>事件处理目录（可用eventbus或者自己写）
       eventMsg.js           >>事件名称配置，自定义事件必须从这个里面引入 
       systemEvent.js        >>系统事件调的器。
     router               >>路由处理目录。如果在安装的时候么有选择路由，将不会产出
       router.js             >>路由名称配置
       routerInstance.js     >>路由实例
       routerManager.js      >>路由跳转管理
     util                 >>工具方法集
       ...                  >>内置了部分的详见具体文件
   
```