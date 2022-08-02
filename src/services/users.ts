import { request } from '@@/plugin-request/request';
import { getAuthority } from '@/utils/authority';
import { transformParams } from '@/utils/transformParams';
import type { API } from '@/serservices/ant-design-pro/typings';

export async function users(
  params?: Record<string, unknown>,
  sort?: Record<string, API.SortOrder>,
) {
  const jwt = await getAuthority();
  return request<API.User>('/api/v1/users/list', {
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

export async function createUser(entry: API.User) {
  const jwt = await getAuthority();

  return request<API.User>(`/api/v1/users`, {
    method: 'POST',
    data: entry,
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  }).then((data) => ({ data }));
}

export async function updateUser(entry: API.User) {
  const jwt = await getAuthority();

  return request<API.User>(`/api/v1/users/${entry.id}`, {
    method: 'PUT',
    data: entry,
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  }).then((data) => ({ data }));
}

export async function alterPassword(entry: API.User) {
  const jwt = await getAuthority();

  return request<API.User>(`/api/v1/users/password`, {
    method: 'PUT',
    headers: {
      Authorization: `bearer ${jwt}`,
    },
    data: entry,
  }).then((data) => ({ data }));
}
