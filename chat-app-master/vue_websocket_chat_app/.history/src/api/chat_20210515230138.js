import request from '@/utils/request'


export function findMaoyan(keyword) {
    return request({
      url: '/chat/maoyan',
      method: 'get',
      params: {}
    })
}
export function findDouban(keyword) {
  return request({
    url: '/chat/douban',
    method: 'get',
    params: {}
  })
}

// 登录
export function login(username, password) {
  return request({
    url: '/chat/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
