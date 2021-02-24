import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  });
}
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  });
}

export function getUser() {
  return request({
    url: '/user/getUser',
    method: 'get'
  });
}

// 删除用户
export function delUser(data) {
  return request({
    url: '/user/delUser',
    method: 'post',
    data
  });
}

// 修改密码
export function changePwd(data) {
  return request({
    url: '/user/changePwd',
    method: 'post',
    data
  });
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  });
}

