// 通用API响应类型定义

/**
 * 统一的API响应结构
 * 匹配后台的 {RequestId: string, Result: T} 格式
 */
export interface ApiResponse<T = any> {
  /** 请求ID */
  code: string;
  /** 响应数据 */
  data: T | null;
  message: string;
}

/**
 * 错误响应结构
 */
export interface ApiErrorResponse {
  /** 请求ID */
  RequestId: string;
  /** 错误代码 */
  ErrCode: number;
  /** 错误信息 */
  ErrMsg: string;
}

/**
 * 分页响应数据结构
 */
export interface PaginatedData<T = any> {
    /** 数据列表 */
    data: T[];
    /** 总数 */
    total: number;
}

/**
 * 分页响应结构
 */
export type PaginatedResponse<T = any> = PaginatedData<T>;

/**
 * 通用请求参数
 */
export interface ApiRequest {
  /** 页码 */
  page?: number;
  /** 每页数量 */
  limit?: number;
}

/**
 * 设备列表请求参数
 */
export interface DeviceListRequest extends ApiRequest {
  /** 设备名称包含 */
  name_contains?: string;
  /** MAC地址包含 */
  mac_contains?: string;
  /** 在线状态 */
  online?: boolean;
  /** 设备模式状态 */
  model_status?: 1 | 2 | 3 | 4;
}

/**
 * 用户列表请求参数
 */
export interface UserListRequest extends ApiRequest {
  /** 用户名包含 */
  username_contains?: string;
  /** 邮箱包含 */
  email_contains?: string;
  /** 状态 */
  is_active?: boolean;
}

/**
 * 管理员列表请求参数
 */
export interface AdminListRequest extends ApiRequest {
  /** 用户名包含 */
  username_contains?: string;
  /** 角色过滤 */
  role?: string;
  /** 状态 */
  is_active?: boolean;
}
