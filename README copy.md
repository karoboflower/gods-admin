# figure_admin

基于 Vite + Vue3 + TypeScript + Element Plus 的中后台管理系统。

## 启动与打包

```bash
# 安装依赖（推荐使用 pnpm）
pnpm install

# 本地开发启动
pnpm dev

# 生产环境打包
pnpm build

# 预览打包产物
pnpm preview
```

## 主要项目结构

```
figure_admin/
├── build/                 # 构建相关脚本与配置
├── mock/                  # 本地 mock 数据
├── plop/                  # 代码生成模板
├── public/                # 静态资源
├── scripts/               # 自动化脚本
├── src/                   # 主源码目录
│   ├── api/               # 所有后端接口定义
│   ├── assets/            # 静态资源（图片、svg等）
│   ├── components/        # 业务通用组件（自动导入）
│   ├── constants/         # 常量定义
│   ├── hooks/             # 通用 hooks
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理（Pinia）
│   ├── styles/            # 全局样式
│   ├── utils/             # 工具函数
│   ├── views/             # 业务页面
│   └── ...                # 其它目录
├── types/                 # 全局类型定义（含 auto-imports.d.ts）
├── index.html             # 入口 HTML
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
├── package.json           # 项目依赖与脚本
└── ...
```

## 技术栈说明
- **Vue3** + **TypeScript**：主流前端框架与类型安全
- **Vite**：极速开发与构建工具
- **Element Plus**：UI 组件库，自动按需引入
- **Pinia**：状态管理
- **unplugin-auto-import**、**unplugin-vue-components**：自动导入常用 API 和组件
- **Sass/SCSS**：样式预处理
- **Mock**：本地及线上 mock 支持
- **Eslint/Prettier**：代码规范与格式化
- **WindiCSS**：原子化 CSS 工具

## 代码规范
- 统一使用 **TypeScript**，类型定义集中在 `types/` 和各业务模块下
- 组件、页面、hooks、工具函数等均采用小写+中划线命名
- 严格遵循 ESLint/Prettier 规范，提交前请确保无 lint 错误
- 业务组件、Element Plus 组件、常用 API 支持自动导入，无需手动 import
- 详见 `.eslintrc*`、`prettier.config.cjs`、`commitlint.config.cjs`

[日常编码规范](https://alidocs.dingtalk.com/document/edit?dentryKey=lXxGv9ZKFzqqMV44&docKey=4EZlwAyxRd9BqxAY&mainsiteOrigin=mainsite&rnd=0.9460609791805232&scene=universalSpace&type=d)


[前端规范](https://alidocs.dingtalk.com/document/edit?dentryKey=AgVVBYOXsLbbX4nn&docKey=8oLl9yZ3QVeklapY&mainsiteOrigin=mainsite&rnd=0.3077226808828062&scene=universalSpace&type=d)

[流程规范](https://alidocs.dingtalk.com/document/edit?dentryKey=Myxw2YgVc0vvnMbb&docKey=pLdn5geGDKAKOo83&mainsiteOrigin=mainsite&rnd=0.265757027039233&scene=universalSpace&type=d)


