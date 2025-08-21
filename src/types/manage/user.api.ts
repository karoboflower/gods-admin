// 用户相关类型定义
import type { ApiRequest } from '../api';

/**
 * 用户数据结构（用户）
 */
export interface UserResponse {
  /** 用户ID */
  id: number;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 真实姓名 */
  realName: string;
  /** 手机号 */
  phone: string;
  /** 头像URL */
  avatar: string;
  /** 性别 0男1女 */
  gender: number;
  /** 地址 */
  address: string;
  /** 支付宝账号 */
  alipay: string;
  /** 审核状态 */
  audit_status: number;
  /** 身份证反面照 */
  backImage: string | null;
  /** 身份证正面照 */
  frontImage: string | null;
  /** 生日 */
  birthday: string;
  /** 营业状态 */
  business_status: number;
  /** 分类 */
  category: number;
  /** 城市ID */
  city: number;
  /** 区号 */
  code: number;
  /** 创建时间（时间戳） */
  created_at: number;
  /** 轮播图/相册 */
  icon: string;
  /** 身份证号 */
  idNo: string;
  /** 标签（逗号分隔） */
  label: string;
  /** 纬度 */
  lat: number;
  /** 经度 */
  lng: number;
  /** 余额 */
  money: number;
  /** 是否新手 1新手0否 */
  newcomer: number;
  /** 订单数 */
  orderNum: number | null;
  /** 下单时间 */
  orderTime: string | null;
  /** 单价 */
  price: number;
  /** 是否优选 1是0否 */
  recommend: number;
  /** 备注 */
  remark: string | null;
  /** 服务时间段 */
  serviceTime: string;
  /** 个性签名 */
  signature: string;
  /** 星级 */
  star: number;
  /** 状态 */
  state: number;
  /** 类型 */
  type: number;
  /** 权重 */
  weight: number;
  /** 体重 */
  weights: string;
}

/**
 * 用户查询请求参数
 */
export interface UserRequest extends ApiRequest {
  /** 用户名 */
  username?: string;
  /** 手机号包含 */
  phone?: string;
}

/**
 * 用户更新请求参数
 */
export interface UserUpdateRequest {
  id: number;
  username?: string;
  nickname?: string;
  phone?: string;
  avatar?: string;
  state?: number;
  // 其它可选字段
}

