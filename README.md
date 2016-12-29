### 前言

参考[@shinygang](https://github.com/shinygang/Vue-cnodejs)的Vue-cnodejs，
使用[cnodejs](https://cnodejs.org/)社区提供的API。
github：[https://github.com/kamifun/vue-Cnode](https://github.com/kamifun/vue-Cnode)

### 技术栈
```
基于vue、vue-router、vuex、vue-resource、ES6、less重写cnode社区的web app
```

### 环境
```
node && npm(node自带)
git bash(clone使用，也可以直接下载zip)
```

### 使用项目
```
1.克隆项目：      git clone https://github.com/kamifun/vue-Cnode.git
2.安装依赖：      npm install
// 开发模式
3.启动服务：      npm run dev
// 生产模式
3.发布代码：      npm run build
```

### 功能
- [x] 首页分类列表
- [x] 长列表优化，列表最长显示4屏
- [ ] 主题详情，回复，点赞
- [ ] 消息列表
- [ ] 消息提醒
- [ ] 消息标记为已读
- [ ] 个人主页
- [ ] 用户信息
- [ ] 登录(token或扫描二维码),永久保存||当前会话
- [ ] 退出
- [ ] 关于
- [ ] 页面后退，数据还原
- [ ] 页面后退，滚动位置还原



### 项目目录说明
```
.
|-- build                            // 项目打包部署配置
|   |-- build.js                     // 生产模式配置(生产dist)
|   |-- check-version.js             // 检查node与npm版本
|   |-- dev-client.js                // 模块热加载，刷新客户端(浏览器)
|   |-- dev-server.js                // 开发模式配置(开启服务，打开浏览器)
|   |-- utils.js                     // 一些工具函数
|   |-- webpack.base.conf.js         // 通用webpack配置
|   |-- webpack.dev.conf.js          // 开发模式webpack配置
|   |-- webpack.prod.conf.js         // 生产模式webpack配置
|-- config                           // 为项目打包提供的配置文件
|   |-- dev.env.js                   // NODE_ENV = development
|   |-- index.js                     // 提供开发与生产模式配置
|   |-- prod.env.js                  // NODE_ENV = production
|   |-- test.env.js                  // NODE_ENV = testing
|-- src                              // 源码目录
|   |-- components                   // 公共组件
|       |-- content.vue              // 页面内容公共组件
|       |-- data-null.vue            // 数据为空时公共组件
|       |-- footer.vue               // 底部导航栏公共组件
|       |-- header.vue               // 页面头部公共组件
|       |-- index.js                 // 加载各种公共组件
|       |-- loading.vue              // 页面数据加载公共组件
|   |-- config                       // 路由配置和程序的基本信息配置
|       |-- config.js                // 配置项目的基本信息
|       |-- routes.js                // 配置页面路由
|   |-- css                          // 各种css文件
|       |-- common.css               // 全局通用css文件
|   |-- iconfont                     // 各种字体图标
|   |-- images                       // 公共图片
|   |-- less                         // 各种less文件
|       |-- common.less              // 全局通用less文件
|       |-- config.less              // 全局通用less配置文件
|   |-- lib                          // 各种插件
|       |-- route-data               // 实现页面后退数据还原，滚动位置还原
|   |-- mixins                       // 各种全局mixins
|       |-- pull-list.js             // 上拉加载
|   |-- pages                        // 各种页面组件
|       |-- about                    // 关于
|       |-- index                    // 首页
|       |-- login                    // 登录
|       |-- my                       // 我的主页，和消息列表
|       |-- signout                  // 退出
|       |-- topic                    // 主题详情，主题新建
|       |-- user                     // 查看用户资料
|   |-- store                        // vuex的状态管理
|       |-- index.js                 // 加载各种store模块
|       |-- user.js                  // 用户store
|   |-- template                     // 各种html文件
|       |-- index.html               // 程序入口html文件
|   |-- util                         // 公共的js方法
|   |-- app.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 编辑器配置
|-- .eslintignore                    // eslint忽略文件
|-- .eslintrc.js                     // eslint规则
|-- .gitignore                       // git忽略文件
|-- index.html                       // 项目首页
|-- package.json                     // 配置项目相关信息，通过执行 npm init 命令创建
|-- README.md                        // 项目说明
.
```

### [线上地址](http://kamifun.github.io/vue-Cnode/)
 [![扫一扫二维码](https://github.com/kamifun/vue-Cnode/raw/dev/src/assets/QR-code.png)](http://kamifun.github.io/vue-Cnode/)
