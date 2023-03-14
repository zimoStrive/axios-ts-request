import { TIME_OUT, BASE_URL } from "./config";
import Request from "./request";

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT
});

//第二个实例 ，做了实例拦截器
export const request2 = new Request({
  baseURL: "http://codercba.com:1888/airbnb/api",
  timeout: 8000,

  interceptors: {
    requestInterceptors: (config) => {
      console.log("第二个实例的请求成功的拦截")
      return config
    },
    requestInterceptorsCatch: (err) => {
      console.log("第二个实例的请求失败的拦截")
      return err
    },
    responseInterceptors: (res) => {
      console.log("第二个实例的响应成功的拦截")
      return res
    },
    responseInterceptorsCatch: (err) => {
      console.log("爱第二个实例的响应失败的拦截")
      return err
    }
  }
  });

export default request;
