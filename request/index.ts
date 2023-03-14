import axios from "axios";
import type { AxiosInstance } from "axios";
import { RequestConfig } from "./type";

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 * 
 *  2.响应结果的类型处理(泛型)
 */

class Request {
  instance: AxiosInstance;

  //request实例 => axios的实例
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);

    //每一个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("全局请求成功拦截");
        return config;
      },
      (err) => {
        console.log("全局请求失败拦截");
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log("全局响应成功拦截");
        return res.data;
      },
      (err) => {
        console.log("全局响应失败的拦截");
        return err;
      }
    );

    // 针对特定的request2实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptors,
      config.interceptors?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptors,
      config.interceptors?.responseInterceptorsCatch
    );
  }

  //封装网络请求方法
  request<T = any>(config: RequestConfig<T>) {
    // 单次请求的请求成功拦截处理
    if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
    }

    return new Promise<T>((resolve,reject)=>{
        this.instance.request<T,any>(config).then(res =>{
            //单次响应的请求成功拦截处理
            if(config.interceptors?.responseInterceptors){
                res = config.interceptors.responseInterceptors(res)
            }
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
  }

  get<T =any>(config:RequestConfig<T>) {
    return this.request({...config,method:"GET"})
  }
  post<T =any>(config:RequestConfig<T>) {
    return this.request({...config,method:"POST"})
  }
  delete<T =any>(config:RequestConfig<T>) {
    return this.request({...config,method:"DELETE"})
  }
  patch<T =any>(config:RequestConfig<T>) {
    return this.request({...config,method:"PATCH"})
  }
}

export default Request;

  