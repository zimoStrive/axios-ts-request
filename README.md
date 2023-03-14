# 目录讲解
1. config文件夹配置 请求地址和请求时间
2. module文件夹 模块化管理api接口
3. request文件夹
   1. index.ts文件 主要封装一个Request类，Request类中添加了全局的类拦截器，每个实例都能拦截到。还添加了特定的实例的拦截器（别的实例不用拦截）。封装网络请求方法（get,post,patch,delete）
   2. type.ts文件  针对AxiosRequestConfig配置进行扩展
4. index.t文件  引入request文件夹，并且实例化定义好的Request类，然后引入config配置请求地址和请求时间。如果有特殊需求也可以实例化第二个Request，做单个实例拦截器。最后暴露出去使用，
  ``` ts
  import request from '..'

  //发网络请求
  request.request({
      url:"----",
  }).then(res =>{
      console.log(res.data)
  })

  request.get({
      url:"----",
  }).then(res =>{
      console.log(res.data)
  })

  ```

  **这个axios封装是通用的可以直接拿来用，用的时候注释掉那些console.log()，如果不使用单个实例拦截器也可以删除实例request2的。然后就可以使用了**