# 项目依赖
项目依赖 jQuery, MamaJSBridge, vue

# 目录结构

``` bash
- build # webpack基础配置
- config # 资源路径/模板路径/代理配置

- src # 源代码
   - main.js # wap 入口
   - App.vue # wap 入口组件
   - main_pc.js # pc 入口
   - PC.vue # pc 入口组件
   # 文件夹
   - router # 路由目录（一般不需要）
   - assets # 静态资源目录
      - images # 图片目录
      - script # 脚本目录
         - bus.js # vue 事件巴士
      - style # 样式目录
         - core # 核心
            - fn.scss # 包含 mixins/variables
         - common.scss # 全局scss 一般引入这个就可以了
         - icon.scss # icon
         - swiper.scss # swiper样式配置
   - components # 组件目录
      - Share.uve # 分享组件
      - Index.uve # 业务组件
- static # 不需要编译的文件
- tpl # 模板文件，包含 index/wapindex
- .postcssrc postcss # 配置文件，包含 autoprefix/px2rem

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
