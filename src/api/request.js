// src/api/request.js
import axios from 'axios'
import { toast } from 'your-toast-library' // 假设你使用了一个提示库，请根据实际使用的库进行替换

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // 应用的基本URL，可从环境变量中获取
  timeout: 5000 // 请求超时时间
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加Token
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做处理
    const res = response.data
    if (res.code !== 200) {
      toast.error(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  (error) => {
    // 对响应错误做处理
    console.error('响应错误:', error)
    toast.error('网络错误，请稍后重试')
    return Promise.reject(error)
  }
)

// GET请求
export function get(url, params) {
  return service({
    url,
    method: 'get',
    params
  })
}

// POST请求
export function post(url, data) {
  return service({
    url,
    method: 'post',
    data
  })
}

// 文件上传
export function uploadFile(url, formData) {
  return service({
    url,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data' // 根据实际情况设置
    }
  })
}
