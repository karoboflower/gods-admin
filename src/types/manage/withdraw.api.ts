import type { ApiRequest } from '../api';

/**
 * 提现返回参数类型
 */
export interface WithdrawResponse {
  /** 提现ID */
  id: number;
  /** 用户ID */
  uid: number;
  /** 审核状态 */
  auditState: number;
  /** 订单号 */
  orderNo: string;
  /** 提现金额 */
  orderAmount: number;
  /** 创建时间（时间戳） */
  created_at: number;
  /** 审核时间（时间戳） */
  auditTime: number;
  /** 审核人ID */
  auditId: number;
  /** 备注 */
  remark: string;
  /** 拒绝原因 */
  refuseReason: string;
  /** 微信支付订单号 */
  wxOrderNo: string;
  /** 手机号 */
  phone: string;
  /** 真实姓名 */
  realName: string;
  /** 支付宝账号 */
  alipay: string;
  /** 用户名 */
  username: string;
}

/**
 * 提现请求参数类型
 */
export interface WithdrawRequest extends ApiRequest {
  /** 手机号 */
  phone?: string;
  /** 真实姓名 */
  realName?: string;
  /** 用户名 */
  username?: string;
}

export interface WithdrawUpdateRequest {
  id: number;
  auditState: number;
  refuseReason?: string;
}