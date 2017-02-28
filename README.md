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
node && npm(安装node的时候有提供选项)
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
- [x] 主题详情，回复，点赞
- [x] 消息列表
- [ ] 消息提醒
- [x] 消息标记为已读
- [x] 个人主页
- [x] 用户信息
- [ ] 登录(token或扫描二维码),永久保存||当前会话
- [x] 退出
- [x] 关于
- [x] vuex存储数据
- [x] 首页列表滚动位置还原
- [x] 点击标题栏，页面返回顶部



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
|   |-- assets                       // 静态资源目录
|       |-- iconfont                 // 字体图标
|       |-- styles                   // 公共样式
|           |-- reset.less           // 重置默认样式
|       |-- favicon.ico              // 网站ico图标
|       |-- grade.png                // 等级雪碧图
|       |-- QR-code.png              // 网站网址二维码
|   |-- components                   // 基础组件
|       |-- Drawer.vue               // 侧边栏滑动组件
|       |-- Grade.vue                // 等级组件
|       |-- Header.vue               // 页面头部组件
|       |-- Infinite.vue             // 无限滚动列表组件
|       |-- List.vue                 // 列表组件
|       |-- Loading.vue              // 页面数据加载组件
|       |-- Menu.vue                 // 侧边栏菜单组件
|       |-- Reply.vue                // 主题回复组件
|       |-- Tabs.vue                 // 选项卡组件
|   |-- store                        // vuex
|       |-- modules                  // vuex模块目录
|           |-- ajax.js              // ajax数据模块
|           |-- head.js              // 标题栏数据模块
|           |-- list.js              // 列表数据模块
|           |-- tabs.js              // 选项卡数据模块
|           |-- user.js              // 用户数据模块
|       |-- index.js                 // vuex入口文件，实例化
|       |-- types.js                 // mutations以及actions命名
|   |-- views                        // 路由视图目录
|       |-- About.vue                // 关于
|       |-- Home.vue                 // 首页
|       |-- Login.vue                // 登录
|       |-- Message.vue              // 消息
|       |-- Topic.vue                // 主题详情
|       |-- User.vue                 // 用户信息
|   |-- App.vue                      // 入口组件
|   |-- filters.js                   // 全局过滤器
|   |-- main.js                      // webpack打包入口文件
|   |-- mixin.js                     // vue全局混入
|   |-- router.js                    // 路由定义
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
