import {request2} from "..";

/* 
request2.request({
  url: "/entire/list",
  params: {
    offset: 0,
    size: 20
  }
}).then(res => {
  console.log(res)
}) */


 interface IHighScoreData {
  list: any[],
  subtitle: string,
  title: string
  type: string,
  _id: string
}
request2.request<IHighScoreData>({
  url: "/home/highscore",
  interceptors: {
    requestInterceptors: (config) => {
      console.log("/home/highscore请求成功的拦截")
      return config
    },
    responseInterceptors: (res) => {
      console.log("/home/highscore响应成功的拦截")
      return res
    }
  }
}).then(res => {
  console.log(res._id,res.list,res.subtitle,res.title,res.type)
})

 