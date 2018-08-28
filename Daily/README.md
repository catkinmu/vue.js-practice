# 知乎日报Demo

## 用法

克隆仓库到本地

``` code
git clone https://github.com/catkinmu/vue.js-practice.git

cd daily

npm i

node proxy.js  

npn run dev    ##在daily目录下重新开一个cmd 执行 npn run dev

```

## 项目结构

``` code
.
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
```
