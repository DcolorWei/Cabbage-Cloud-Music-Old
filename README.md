# 卷心菜云音乐  

#### 介绍  
卷心菜云音乐是卷心菜工作室开发的独立音乐平台项目，除开发所需的工具组件外，不涉及任何可能的版权问题  
  
#### 软件架构  
仓库项目为服务端(music-server)，客户端项目请看隔壁，安装使用教程详见下方  


#### 数据库搭建
首先要确定服务器安装了mysql服务，请在module/mysql/curd.js文件内配置好数据库信息，数据库表名为songinfo，表结构为id|name|author|album|songfilepath，自定义方法还未更新

#### 服务端搭建教程
1. npm run install
2. npm start  
默认端口为3000，

#### 接口文档
https://www.apifox.cn/apidoc/shared-4044c07b-cb1f-4fb2-a929-46c0191dfe0f
（其实是开发人员懒得手写了）
  
#### 参与贡献
卷心菜工作室 开源