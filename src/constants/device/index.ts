// 设备模式枚举
enum ModelStatus {
  Init = 1,        // 工厂模式
  FactoryMode = 2, // 出厂模式
  Active = 3,      // 已激活
  Inactive = 4,    // 停用
}


// 设备模式选项
const ModelStatusOptions = [
  { label: '工厂模式', value: ModelStatus.Init, type: 'info' },
  { label: '出厂模式', value: ModelStatus.FactoryMode, type: 'warning' },
  { label: '已激活', value: ModelStatus.Active, type: 'success' },
  { label: '停用', value: ModelStatus.Inactive, type: 'danger' },
] as const;

// 导出枚举和相关配置
export { ModelStatus, ModelStatusOptions };