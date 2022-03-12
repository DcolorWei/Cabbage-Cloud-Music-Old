# 卷心菜云音乐  

#### 介绍  
卷心菜云音乐是卷心菜工作室开发的独立音乐平台项目，除开发所需的工具组件外，不涉及任何可能的版权问题  
  
#### 软件架构  
仓库项目为服务端(music-server)，客户端项目请看隔壁，安装使用教程详见下方  


#### 数据库搭建
确定服务器已安装mysql，数据库表名为songinfo，表结构为id|name|author|album|songfilepath

#### 服务端搭建教程
1.安装依赖 
npm run install  
2.修改config文件  
请在该文件下编写服务器信息与数据库信息  
2.启动项目  
npm start  
默认端口为3000

#### 使用技巧
1.上传音乐
可以将音乐文件直接批量上传入stock/song文件夹，然后使用npm run scan命令扫描以同步数据库
2.获取歌词
将lrc格式歌词移动如stock/lyric文件夹，歌词需与mp3文件同名

#### 接口文档
更多使用技巧或部署说明请参考接口文档
https://www.apifox.cn/apidoc/shared-4044c07b-cb1f-4fb2-a929-46c0191dfe0f
（其实是开发人员懒得手写了）
  
#### 参与贡献
卷心菜工作室 开源