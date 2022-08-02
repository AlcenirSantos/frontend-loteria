import { request } from '@@/plugin-request/request';
import { getAuthority } from '@/utils/authority';
import { transformParams } from '@/utils/transformParams';
import type { API } from '@/serservices/ant-design-pro/typings';

export async function lotomanias(
  params?: Record<string, unknown>,
  sort?: Record<string, API.SortOrder>,
) {
  const jwt = await getAuthority();
  return request<API.User>('/api/v1/lotomania/', {
    method: 'GET',
    params: transformParams(params, sort),
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  }).then((data) => ({
    total: data.totalRecords,
    success: true,
    data: data.records,
  }));
}

export async function createLotomania(entry: API.User) {
  const jwt = await getAuthority();

  return request<API.User>(`/api/v1/lotomania`, {
    method: 'POST',
    data: entry,
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  }).then((data) => ({ data }));
}

