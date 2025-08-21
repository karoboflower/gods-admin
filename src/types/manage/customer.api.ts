import type { ApiRequest } from '../api';
/**
 * 客服返回参数类型
 */
export interface CustomerResponse {
  /** 城市名称 */
  cityName: string;
  /** 创建时间（时间戳） */
  created_at: number;
  /** 客服ID */
  id: number;
  /** 客服昵称 */
  nickname: string;
  /** 手机号 */
  phone: string;
  /** 备注 */
  remark: string;
  /** 排序 */
  sort: number;
  /** 状态 0正常1禁用 */
  state: number;
  /** 用户ID */
  uid: number;
  /** 更新时间（时间戳） */
  updateTime: number;
  /** 用户名 */
  username: string | null;
}

/**
 * 客服请求参数类型
 */
export interface CustomerRequest extends ApiRequest {
  /** 城市名称 */
  cityName?: string;
  /** 手机号 */
  phone?: string;
  /** 用户名 */
  username?: string;
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
}
/**
 * 客服请求参数类型
 */
export interface CustomerUpdateRequest {
  id: number;
  state?: number;
  /** 城市名称 */
  cityName?: string;
  /** 手机号 */
  phone?: string;
  /** 用户名 */
  username?: string;
  uid?: number;
}