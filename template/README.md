# 项目依赖
项目依赖 jQuery, MamaJSBridge, vue

# 目录结构

``` bash
# webpack基础配置
|- build
# 资源路径/模板路径/代理配置
|- config
# 源代码
|- src
   # wap 入口
   |- main.js
   # wap 入口组件
   |- App.vue
   # pc 入口
   |- main_pc.js 
   # pc 入口组件
   |- PC.vue 
   # 路由目录（一般不需要）
   |- router 
   # 静态资源目录
   |- assets 
      # 图片目录
      |- images 
      # 脚本目录
      |- script 
         # vue 事件巴士
         |- bus.js 
      # 样式目录
      |- style 
         # 核心
         |- core 
         # 包含 mixins/variables
            |- fn.scss 
         # 全局scss 一般引入这个就可以了
         |- common.scss 
         # icon
         |- icon.scss 
         # swiper样式配置
         |- swiper.scss 
   # 组件目录
   |- components 
      # 分享组件
      |- Share.uve 
      # 业务组件
      |- Index.uve 
# 不需要编译的文件
|- static 
# 模板文件，包含 index/wapindex
|- tpl 
# 配置文件，包含 autoprefix/px2rem
|- .postcssrc postcss 

```

> A Vue.js project

## Build 安装

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
