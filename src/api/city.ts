import type { ApiRequest, PaginatedResponse } from '@/types/api';
import type { CustomerResponse, CustomerUpdateRequest } from '@/types/manage/customer.api';
import { defHttp } from '@/axios';

export function getCityList(data: ApiRequest) {
  return defHttp.post<PaginatedResponse<CustomerResponse>>({
    url: `/common/citys`,
    params: data,
  });
}

export function updateCityCustomer(data: CustomerUpdateRequest) {
  return defHttp.post({
    url: `/manage/citys/update/${data.id}`,
    data,
  });
}

export function updateCityState(data: CustomerUpdateRequest) {
  return defHttp.post<ApiResponse<null>>({
    url: `/manage/citys/update-state/${data.id}`,
    params: data,
  });
}
