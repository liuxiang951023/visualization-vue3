import { post } from './request'

// 用户登录
export function login(data) {
  return post('/user/login', data)
}
