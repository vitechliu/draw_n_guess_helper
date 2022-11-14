# nico_service_helper
nico_service DDD自动代码生成工具

## 开发
```
npm install
npm run electron:serve
```
## 发布
```
npm run election:build
```
## 下载
[云效](https://thoughts.aliyun.com/workspaces/612f181088d9c6001a04b81e/docs/618cc5f1e87e050001901e49)

## 使用方式

打开app后，在右上角输入nico_service项目路径，点击小飞机按钮即可缓存目录。
然后即可使用！

### TODO 开发中的功能
- 自动生成迁移文件
- 自动生成CRUD逻辑
- 保存文件时支持判断dependencies中是否已存在


## 定制化 - 二次开发

  在目录public/sample下更改.php.tpl文件修改模型
  然后在src/includes/dddCreator.js 核心文件修改绑定逻辑

