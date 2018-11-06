# purchase

> purchase

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8090
npm run dev 

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### src目录结构
	|--assets // 一些静态资源目录
	  |--packages // 第三方插件
	  |--stylus // stylus初始化样式文件
	|--components // 公用基础组件
	|--mixins // 公用混入
	  |-formSearchCommon.js // 表格查询时的公用mixin
	|--mockData // mock相关，前端本地模拟调试
	  |--common // 公用mock
	  |--index.js // 启用mock的主文件，可配置HOST等
	  |--no-mock.js // 默认禁用状态不引入mockjs，会启用这个文件
	  ...其他模块相关管理文件
	  ...一些菜单目录等json文件
	|--router
	  |--views // 按页面模块独立注册路由
	  |-index.js // 汇总路由，现有路由跳转前后钩子函数处理逻辑，后期视复杂度剥离出来
	|--store // 公用状态管理（用户信息，面包屑，遮罩显示等等）
	|--utils // 公用工具包
	  |-default-setting.js // 业务公用设置，比如时间段选择的设置等等
	  |-dom.js // dom操作相关方法
	  |-bus.js // 公用vue实例作为广播
	  |-http.js // 公用ajax请求封装，加入了请求队列存储，简化书写，默认判断等
	  |-utils.js // 公用方法函数
	  |--index.js // 全局注册http请求
	|--views // 业务模块界面编写
	  |--common // 公用业务组件
	    |-form-froup-btns.vue // 表单查询、重置按钮公用样式
	    |-goods-detail.vue // 商品列表表格详情（仅展示）
	  |--home.vue // 首页
	|--services // 类似于api文件夹管理模式，模仿了ng的service管理公用业务逻辑的模式，这里可配置接口的api定义；
	也可以把业务逻辑抽取出来放在service中实现；可通过sevices存储公用属性和部分不需实时监听的公用状态，解决滥用vuex的问题
	  |-ajax.service.js // 这是ajax请求相关的服务（对ajax进行公用封装）
	  |-store.service.js // 这是负责储存公用数据的服务 （一些页面过渡需要短暂缓存或者公用请求需要共享的数据可以放这里）
	  |-common.service.js // 这是所有模块公用业务逻辑的服务 （也可以设置公用配置）
	  |-index.js // 汇总注册
	|-App.vue // 根layout界面
	|-main.js // 主入口文件，负责注册组件引入样式、路由、vuex等