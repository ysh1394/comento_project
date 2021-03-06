import request from '@/utils/request';

export function getList(
  page: number,
  limit: number,
  ord: string,
  category: string,
) {
  return request({
    url: `/api/list?page=${page}&limit=${limit}&ord=${ord}${category}`,
    method: 'get',
  });
}

export function getAds(page: number, limit: number) {
  return request({
    url: `/api/ads?page=${page}&limit=${limit}`,
    method: 'get',
  });
}

export function getCategory() {
  return request({
    url: '/api/category',
    method: 'get',
  });
}

export function getView(id: number) {
  return request({
    url: `/api/view?id=${id}`,
    method: 'get',
  });
}
