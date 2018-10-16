
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# vuecli
1)支持带外壳和不带外壳
  a.带外壳时，path='/'的路由模版需要指定到@/page/Base/layout.vue
  b.不带外壳时，path='/'的路由模版需要指定到@/page/Base/index.vue

2)支持标签页和面包屑结构，根据业务系统需求两者不会同时存在
  a.带标签页时，需要配置store=>modules=>app=>state=>TabORCrumb: 'tab'
  b.带面包屑时，需要配置store=>modules=>app=>state=>TabORCrumb: 'crumb'
  c.都不带时候，需要配置store=>modules=>app=>state=>TabORCrumb: ''或者none

3)支持页面缓存
  a.带缓存时，路由=>对应页面的meta需设置keepAlive: true
  b.不带缓存时，路由=>对应页面的meta需设置keepAlive: false

4)支持在tab标签页中新开详情页，路由需要配置
  meta: { title: 'detailtext', icon: '', keepAlive: false, detail: true, pkid: new Date().getTime(), parentID: 16538 }
  detail 属性指定详情页标识
  pkid 时间戳随机数不用动
  parentID 对应的一级菜单pkid


目录结构：

api文件目录
  config.js-------->定义接口host,所有接口url
  index.js--------->接口调用通用方法

assets文件目录
  静态资源（图片，样式）

components文件目录
  存放公共组件（文件夹形式）可将组件异步注册到全局
  a)Layout 外壳布局模块
  b)SearchComp 搜索模块
  c)TableComp 表格组件

directives文件目录
  自定义指令目录

page文件目录
  存放路由页面
  Base----->布局
  demo----->项目开发时可删除







