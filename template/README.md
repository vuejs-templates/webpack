# {{ name }}

> {{ description }}

## Build Setup

# 中升服务号

## 开发环境搭建

1. 安装nodejs
2. 执行 `npm install` 安装 package.json 中的 node 模块
3. 执行 `npm run dev` 启动调试模式

## 构建

### TEST环境部署
1. 执行 `npm run build-test`

### IDC 正式环境部署
1. 修改 package.json 中的版本号
2. 执行 `npm run build` 将生成携带cdn路径的入口文件
3. 如果需要部署到 cdn
  * 保证环境变量中 `ACCESSKEYID`,`ACCESSKEYSECRET` 已设置
  * 执行 `npm run cdn`

## 搭建本地代理

1. 下载安装 [fiddler](https://www.telerik.com/download/fiddler)
2. 在rule改写中 将远程地址代理到本地

  | 正则匹配 | 相应重定向 |
  | ---------------------------------------------------------- | ------------------- |
  | regex:(?isx)^https://testzswx.cheanjia.com/((?!(api\|auth)).*) | http://localhost:8000/$1 |
