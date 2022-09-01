import { request } from '@@/plugin-request/request';
import { getAuthority } from '@/utils/authority';
import { transformParams } from '@/utils/transformParams';
import type { API } from '@/serservices/ant-design-pro/typings';

export async function bets(
  params?: Record<string, unknown>,
  sort?: Record<string, API.SortOrder>,
) {
  const jwt = await getAuthority();
  return request<API.Company>('/api/v1/lotofacil/findAllBets', {
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

export async function checkBets(entry: API.Company) {
  const jwt = await getAuthority();

  return request<API.Company>(`/api/v1/lotofacil/checkBets`, {
    method: 'POST',
    data: entry,
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  }).then((data) => ({ data }));
}
export async function generateBets(entry: API.Company) {
  const jwt = await getAuthority();

  return request<API.Company>(`/api/v1/lotofacil/generateBets`, {
    method: 'POST',
    data: entry,
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  }).then((data) => ({ data }));
}
export async function generateBetsRules(entry: API.Company) {
  const jwt = await getAuthority();

  return request<API.Company>(`/api/v1/lotofacil/generateBetsRules`, {
    method: 'POST',
    data: entry,
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  }).then((data) => ({ data }));
}
