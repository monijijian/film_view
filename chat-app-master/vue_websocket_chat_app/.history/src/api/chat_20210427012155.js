import request from '@/utils/request'


export function findMaoyan(keyword) {
    return request({
      url: '/chat/maoyan',
      method: 'get',
      params: {}
    })
}
