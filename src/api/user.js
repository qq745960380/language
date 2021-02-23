import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  });
}
export function getInfo() {
  return request({
    url: '/api/user/info',
    method: 'get'
  });
}

export function getUser() {
  return request({
    url: '/api/user/getUser',
    method: 'get'
  });
}

