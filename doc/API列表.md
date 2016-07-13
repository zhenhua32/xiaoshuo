# API 列表

## novel 部分

方法  | 链接 | 变量
---- |----- |------
put  | /novel                  |title author                              
get  | /novel/:id              |无                            
post | /novel/:id/title        |title                
post | /novel/:id/author       |author    
put  | /novel/:id/body         |bodyid 


## chapter 部分

方法  | 链接 | 变量
---- |----- |-----
put  | /chapter                |index body novel                   
get  | /chapter/:id            |无                       
post | /chapter/:id            |index || body  ||novel                       


