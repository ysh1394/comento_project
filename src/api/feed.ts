import request from '@/utils/request';

export function getList(query: any) {
  return request({
    url: '/api/list',
    method: 'get',
    params: query,
  });
}

export function getCategory(query: any) {
  return request({
    url: '/api/category',
    method: 'get',
    params: query,
  });
}
