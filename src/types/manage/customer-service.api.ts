import type { ApiRequest } from '@/types/api'

// 客服管理请求参数
export interface CustomerServiceRequest extends ApiRequest {
  /** 城市ID */
  cityId?: number
  /** 客服昵称 */
  nickname?: string
  /** 客服手机号 */
  phone?: string
}

// 客服管理响应数据
export interface CustomerServiceResponse {
  /** ID */
  id: string
  /** 城市ID */
  city_id: number
  /** 客服昵称 */
  nickname: string
  /** 客服手机号 */
  phone: string
  /** 用户ID */
  uid: string
  /** 状态 0-正常 1-禁用 */
  state: number
  /** 排序 */
  sort: number
  /** 备注 */
  remark: string
  /** 创建时间 */
  create_time: number
  /** 更新时间 */
  update_time: number
}

// 创建客服请求参数
export interface CustomerServiceCreateRequest {
  /** 城市ID */
  city_id: number
  /** 客服昵称 */
  nickname: string
  /** 客服手机号 */
  phone: string
  /** 备注 */
  remark?: string
}

// 更新客服请求参数
export interface CustomerServiceUpdateRequest {
  /** ID */
  id: string
  /** 城市ID */
  cityId?: number
  /** 客服昵称 */
  nickname?: string
  /** 客服手机号 */
  phone?: string
  /** 状态 */
  state?: number
  /** 备注 */
  remark?: string
}

// 城市选项
export interface CityOption {
  /** 标签 */
  label: string
  /** 值 */
  value: string
}
