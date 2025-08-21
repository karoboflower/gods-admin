// 通用状态枚举
export enum CommonStatus {
  Normal = 1, // 正常
  Disabled = 2, // 禁用
}

// 状态选项
export const CommonStatusOptions = [
  { label: '正常', value: CommonStatus.Normal, type: 'success' },
  { label: '禁用', value: CommonStatus.Disabled, type: 'danger' },
] as const;
