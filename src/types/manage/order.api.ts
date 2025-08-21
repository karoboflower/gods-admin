import type { ApiRequest } from '../api';



/**
 * 订单响应数据结构
 */
export interface OrderResponse {
  /** 订单ID */
  id: number;
  /** 订单号 */
  orderNo: string;
  /** 总订单号 */
  totalNo: string;
  /** 地址 */
  address: string;
  /** 地址ID */
  addressId: number;
  /** 区域ID */
  areaId: number | null;
  /** 区域名称 */
  areaName: string | null;
  /** 订单内容 */
  content: string;
  /** 订单金额 */
  orderAmount: number;
  /** 总金额 */
  totalAmount: number;
  /** 成本金额 */
  costAmount: number;
  /** 代理金额 */
  agentAmount: number | null;
  /** 支付金额 */
  price: number;
  /** 支付状态 0未支付1已支付 */
  paymentState: number;
  /** 支付时间（时间戳） */
  paymentTime: number;
  /** 微信支付流水号 */
  wxPaymentNo: string;
  /** 微信退款流水号 */
  wxRefundNo: string | null;
  /** 退款金额 */
  refundAmount: number;
  /** 备注 */
  remark: string;
  /** 距离（km） */
  distance: string;
  /** 时长（分钟） */
  duration: number;
  /** 星级 */
  star: number;
  /** 评分状态 */
  scoreState: number | null;
  /** 评分时间 */
  scoreTime: number | null;
  /** 创建时间（时间戳） */
  created_at: number;
  /** 开始时间（字符串） */
  startTime: string;
  /** 结束时间（字符串） */
  endTime: string;
  /** 教练ID */
  tid: number;
  /** 教练名称 */
  tutorName: string;
  /** 教练手机号 */
  tutorPhone: string;
  /** 教练头像 */
  tutorIcon: string | null;
  /** 教练状态 */
  tutorState: number;
  /** 订单类型 */
  type: number;
  /** 用户ID */
  uid: number;
  /** 用户名称 */
  userName: string | null;
  /** 用户手机号 */
  userPhone: string;
  /** 匿名标记 */
  anonymous: number;
  /** 账单信息 */
  billing: string;
}

/**
 * 订单请求参数
 */
export interface OrderRequest extends ApiRequest {
  /** 订单号 */
  orderNo?: string;
  /** 教练名称 */
  tutorName?: string;
  /** 教练手机号 */
  tutorPhone?: string;
  /** 支付状态 */
  paymentState?: number;
  /** 时间区间（逗号分隔） */
  rangeTime?: string;
  // 前端使用
  created_at?: [string,string]; // 创建时间
}