import type { ApiRequest } from '../api';

/**
 * 教练信息响应类型
 */
export interface CoachResponse {
  /** 地址 */
  address: string;
  /** 支付宝账号 */
  alipay: string;
  /** 审核状态 */
  audit_status: number;
  /** 头像 */
  avatar: string;
  /** 身份证反面照 */
  backImage: string | null;
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
  /** 身份证正面照 */
  frontImage: string | null;
  /** 性别 0男1女 */
  gender: number;
  /** 身高 */
  height: string;
  /** 轮播图/相册 */
  icon: string;
  /** 主键ID */
  id: number;
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
  /** 昵称 */
  nickname: string;
  /** 订单数 */
  orderNum: number | null;
  /** 下单时间 */
  orderTime: string | null;
  /** 手机号 */
  phone: string;
  /** 单价 */
  price: number;
  /** 真实姓名 */
  realName: string;
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
  /** 用户名 */
  username: string;
  /** 权重 */
  weight: number;
  /** 体重 */
  weights: string;
}

/**
 * 教练列表请求参数
 */
export interface CoachRequest extends ApiRequest {
  /** 城市ID */
  cityId?: number;
  /** 手机号 */
  phone?: string;
  /** 用户名 */
  username?: string;
}

/**
 * 教练权重/优选修改参数
 */
export interface CoachUpdateWeightRequest {
  /** 权重 */
  weight?: number;
  /** 教练ID */
  id: number;
  /** 是否优选 */
  recommend: boolean;
}

/**
 * 教练信息修改参数
 */
export interface CoachUpdateRequest {
  // 教练id
  id: string;
  /** 单价 */
  price?: number;
  /** 审核状态 */
  audit_status?: number;
  /** 备注 */
  remark?: string;
  weight?: number;
  recommend?: number;
}
