import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data,
    headers: {

    }
  });
}
export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  });
}
