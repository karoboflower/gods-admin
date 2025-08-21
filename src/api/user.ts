import { defHttp } from '@/axios';

export function loginApi(data: any) {
  return defHttp.post({
    url: '/auth/login',
    params: data,
  });
}
