# API 列表

## novel 部分

方法  | 链接 | query 或 post 参数
---- |----- |------
put  | /novel                     |title author link                         
get  | /novel/id/:id              |无                            
post | /novel/id/:id/title        |title                
post | /novel/id/:id/author       |author    
put  | /novel/id/:id/body         |bodyid 
get  | /novel/all                 |limit skip

## chapter 部分

方法  | 链接 | 变量
---- |----- |-----
put  | /chapter                |index title body novel                   
get  | /chapter/:id            |无                       
post | /chapter/:id            |index  body  novel  
get  | /chapter/all            |novelid limit skip
get  | /chapter/count          |novelid               
get  | /chapter/find           |novelid index
get  | /chapter/findbyid       |id                     

检索的时候如果资源不存在, 应该返回404

状态响应
* 200: 正常
* 400: 请求的参数错误
* 404: 资源不存在
* 500: 服务器内部错误
