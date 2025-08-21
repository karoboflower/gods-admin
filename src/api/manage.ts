import type { CoachRequest, CoachResponse, CoachUpdateRequest } from '@/types/manage/coach.api';
import type { OrderRequest, OrderResponse } from '@/types/manage/order.api';
import type { ApiResponse, PaginatedResponse } from '@/types/api';
import type { UserRequest, UserResponse } from '@/types/manage/user.api';
import type { WithdrawRequest, WithdrawResponse } from '@/types/manage/withdraw.api';
import type { CustomerServiceRequest, CustomerServiceResponse, CustomerServiceCreateRequest, CustomerServiceUpdateRequest } from '@/types/manage/customer-service.api';
import { defHttp } from '@/axios';

export function getCoachList(data: CoachRequest) {
  return defHttp.get<PaginatedResponse<CoachResponse>>({
    url: `/manage/cue-buddy`,
    params: data,
  });
}

export function getUserList(data: UserRequest) {
  return defHttp.get<PaginatedResponse<UserResponse>>({
    url: `/manage/users`,
    params: data,
  });
}

export function updateCoach(data: CoachUpdateRequest) {
  return defHttp.put({
    url: `/manage/cue-buddy/${data.id}`,
    data,
  });
}

export function getWithdrawList(data: WithdrawRequest) {
  return defHttp.post<PaginatedResponse<WithdrawResponse>>({
    url: `/manage/withdraws`,
    params: data,
  });
}

export function auditWithdraw(id: number,params) {
  return defHttp.post({
    url: `/manage/withdraws/audit/${id}`,
    params
  });
}

export function changeTutorWeight(data: { id: number; weight: number }) {
  return defHttp.post({
    url: `/manage/user/weight/${data.id}`,
    data,
  });
}

export function getOrderList(data: OrderRequest) {
  return defHttp.post<PaginatedResponse<OrderResponse>>({
    url: `/manage/orders`,
    params: data,
  });
}

// 客服管理
export function getCustomerServiceList(data: CustomerServiceRequest) {
  return defHttp.get<PaginatedResponse<CustomerServiceResponse>>({
    url: `/manage/customer`,
    params: data,
  });
}

export function createCustomerService(data: CustomerServiceCreateRequest) {
  return defHttp.post({
    url: `/manage/customer`,
    data,
  });
}

export function updateCustomerService(data: CustomerServiceUpdateRequest) {
  return defHttp.put({
    url: `/manage/customer/${data.id}`,
    data,
  });
}
