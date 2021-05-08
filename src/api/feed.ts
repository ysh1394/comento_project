import request from '@/utils/request';

export function getList(
  page: number,
  limit: number,
  ord: string,
  category: number,
) {
  // console.log(data);

  return request({
    // https://problem.comento.kr/api/list?page=1&limit=10&ord=asc&category[]=1
    // url: `/api/list?page=1&limit=10&ord=desc&category[]=1`,
    url: `/api/list?page=${page}&limit=${limit}&ord=${ord}&category[]=${category}`,
    method: 'get',
    // params: data,
  });
}

export function getAds(page: number, limit: number) {
  return request({
    url: `/api/ads?page=${page}&limit=${limit}`,
    method: 'get',
    // params: query,
  });
}

export function getCategory() {
  return request({
    url: '/api/category',
    method: 'get',
    // params: query,
  });
}

export function getView(id: number) {
  return request({
    url: `/api/view?id=${id}`,
    method: 'get',
    // params: query,
  });
}
