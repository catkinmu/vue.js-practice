# vue.js_2.x_demo

基于 Vue2.x 的实践demo

## 用法

克隆仓库到本地

``` code
git clone https://github.com/catkinmu/vue.js-practice.git
```

## 项目结构

``` code
.
├── TabSwitch                     ## Tab切换组件
│   └── index.html                ## html模板
│   └── js
│       ├── pane.js               ## 面板组件
│       └── tabs.js               ## 切换组件
│   └── css
│       └── style.css             ## 样式表
├── MessageBoard                  ## render模式留言板demo
│   └── index.html                ## html模板
│   └── js
│       ├── index.js              ## 主要脚本
│       ├── input.js              ## 输入框组件(昵称, 留言两个组件)
│       └── list.js               ## 留言列表组件
│   └── css
│       └── style.css             ## 样式表
├── SortTable                     ## 可排序table组件
│   └── index.html                ## html模板
│   └── js
│       └── index.js              ## 表格组件
│   └── css
│       └── style.css             ## 样式表
├── RouteDemo                     ## vue路由初探
│   ├── index.html                ## html模板
│   ├── index.ejs                 ## 打包模板(动态设置js,css路径)
│   ├── app.vue                   ## 组件入口
│   ├── main.js                   ## 入口文件(包含路由配置)
│   ├── style.css                 ## 项目样式表
│   └── views                     ## 组件库
│       ├── about.vue
│       ├── user.vue
│       └── index.vue
│   ├── .babelrc                  ## ES6语法编译配置
│   ├── .gitignore                ## git版本控制忽略文件
│   ├── webpack.config.js         ## 项目打包配置
│   ├── webpack.prod.config.js    ## 生产环境打包配置
│   └── package.json              ## 配置项目相关信息，通过执行 npm init 命令创建
├── VuexDemo                      ## Vuex状态管理初探
│   ├── index.html                ## html模板
│   ├── index.ejs                 ## 打包模板(动态设置js,css路径)
│   ├── app.vue                   ## 组件入口
│   ├── main.js                   ## 入口文件(包含vuex配置)
│   ├── style.css                 ## 项目样式表
│   └── views                     ## 组件库
│       ├── about.vue
│       ├── user.vue
│       └── index.vue
│   ├── .babelrc                  ## ES6语法编译配置
│   ├── .gitignore                ## git版本控制忽略文件
│   ├── webpack.config.js         ## 项目打包配置
│   ├── webpack.prod.config.js    ## 生产环境打包配置
│   └── package.json              ## 配置项目相关信息，通过执行 npm init 命令创建
├── Daily                         ## 仿知乎日报
│   ├── index.html                ## html模板
│   ├── index.ejs                 ## 打包模板(动态设置js,css路径)
│   ├── app.vue                   ## 组件入口
│   ├── main.js                   ## 入口文件(包含vuex配置)
│   ├── proxy.js                  ## 接口代理配置
│   ├── style.css                 ## 项目样式表
│   └── compontents               ## 组件库
│       ├── daily-article.vue     ## 详情组件
│       └── item.vue              ## 列表组件
│   └── directives
│       └── time.js               ## 时间指令
│   └── libs
│       └── util.js               ## 工具包
│   ├── .babelrc                  ## ES6语法编译配置
│   ├── .gitignore                ## git版本控制忽略文件
│   ├── webpack.config.js         ## 项目打包配置
│   ├── webpack.prod.config.js    ## 生产环境打包配置
│   ├── package.json              ## 配置项目相关信息，通过执行 npm init 命令创建
│   └── README.md                 ## 项目说明
└── README.md                     ## 项目说明

```
