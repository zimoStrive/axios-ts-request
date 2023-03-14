import request from '..'

//发网络请求
request.request({
    url:"/home/multidata",

}).then(res =>{
    console.log(res.data)
    
})

request.get({
    url:"/home/multidata",

}).then(res =>{
    console.log(res.data)
})
