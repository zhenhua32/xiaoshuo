# 小说网站
这次打算做个大项目, 完整的小说网站, 完成之后打算架设在服务器上.

* [步骤](#步骤)
* [爬虫](#爬虫)
* 

## 步骤
* 爬虫获取资源保存到服务器, 手动运行或一直运行
* Restful 服务器提供API, 一直运行
* 网站界面
* Nginx 提供静态页, 并作为网站服务器, 一直运行
* 提供 android 和 ios app

因为步骤多, 所以是分项目进行的, 不会整合在一起.

## 爬虫
首先, 锁定几个小说网站作为目的源.
爬虫获取并解析资源, 然后将资源存储在 mongodb 中.

技术栈:
* request
* cheerio
* 

## Restful 服务器
Restful 服务器主要是负责提供数据存储
* 爬虫所需的API
* 网站所需的API

技术栈:
* mongoose
* restify
* 

## 网站界面
设计估计还是使用 MD(Material design).
不过界面可能不会使用 angular2.
因为打算生成移动端的本地应用, 所以考虑使用 React 和 React Native.

技术栈:
* React
* 

## Nginx
说起来还没用过 nginx, 不过总要有静态服务器.

## app
全平台制霸才是王道, 所以还是都要生成本地应用的.

技术栈:
* React Native
* 

## 进度(实时更新)

* crawler 部分
  * 正在进行网站选择
* restful 部分
  * 基础模型 novel 已搭建
  * 基础模型 chapter 已搭建
  * 完成一部分 novel 的 rest 方法
  * 完成一部分 chapter 的 rest 方法
* ui 部分



说真的, 有点激动人心, 做大项目, 万一最后迎娶白富美呢.

反正找不到工作, 随便折腾.



