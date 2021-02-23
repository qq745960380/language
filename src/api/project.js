import request from '@/utils/request';

export function getProjectList() {
  return request({
    url: '/api/project/getProjectList',
    method: 'get'
  });
}

export function getNewProject(data) {
  return request({
    url: '/api/project/getNewProject',
    method: 'post',
    data
  });
}

export function delProject(data) {
  return request({
    url: '/api/project/delProject',
    method: 'post',
    data
  });
}

// 增加项目记录
export function addProjectRecord(data) {
  return request({
    url: '/api/project/addRecord',
    method: 'post',
    data
  });
}
// 删除项目记录
export function delProjectRecord(data) {
  return request({
    url: '/api/project/delRecord',
    method: 'post',
    data
  });
}

export function getProjectRecord(data) {
  return request({
    url: '/api/project/getRecord',
    method: 'post',
    data
  });
}

// 查询导出的记录数据
export function getExportRecord(data) {
  return request({
    url: '/api/project/getExportRecord',
    method: 'get',
    params: data
  });
}

// 更新项目记录
export function updateProjectRecord(data) {
  return request({
    url: '/api/project/updateRecord',
    method: 'post',
    data
  });
}

// 查询项目负责人
export function getDirector(data) {
  return request({
    url: '/api/project/getDirector',
    method: 'get',
    params: data
  });
}

// 增加项目负责人
export function addDirector(data) {
  return request({
    url: '/api/project/addDirector',
    method: 'post',
    data
  });
}

// 删除项目负责人
export function delDirector(data) {
  return request({
    url: '/api/project/delDirector',
    method: 'post',
    data
  });
}

