import request from '@/utils/request';

export function getProjectList(data) {
  return request({
    url: '/project/getProjectList',
    method: 'get',
    params: data
  });
}

export function getNewProject(data) {
  return request({
    url: '/project/getNewProject',
    method: 'post',
    data
  });
}

export function delProject(data) {
  return request({
    url: '/project/delProject',
    method: 'post',
    data
  });
}

// 增加项目记录
export function addProjectRecord(data) {
  return request({
    url: '/project/addRecord',
    method: 'post',
    data
  });
}
// 删除项目记录
export function delProjectRecord(data) {
  return request({
    url: '/project/delRecord',
    method: 'post',
    data
  });
}

export function getProjectRecord(data) {
  return request({
    url: '/project/getRecord',
    method: 'post',
    data
  });
}

// 查询导出的记录数据
export function getExportRecord(data) {
  return request({
    url: '/project/getExportRecord',
    method: 'get',
    params: data
  });
}

// 更新项目记录
export function updateProjectRecord(data) {
  return request({
    url: '/project/updateRecord',
    method: 'post',
    data
  });
}

// 查询项目负责人
export function getDirector(data) {
  return request({
    url: '/project/getDirector',
    method: 'get',
    params: data
  });
}

// 增加项目负责人
export function addDirector(data) {
  return request({
    url: '/project/addDirector',
    method: 'post',
    data
  });
}

// 删除项目负责人
export function delDirector(data) {
  return request({
    url: '/project/delDirector',
    method: 'post',
    data
  });
}

