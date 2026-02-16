# AGENTS.md

QtEasyTier 官方文档项目上下文指南，用于 AI 代理理解项目结构和开发规范。

## 项目概述

本项目是 [QtEasyTier](https://gitee.com/viagrahuang/qt-easy-tier) 的官方文档网站，使用 [Astro](https://astro.build/) 框架和 [Starlight](https://starlight.astro.build/) 文档主题构建。

- **框架**: Astro 5.6+
- **主题**: @astrojs/starlight 0.37+
- **包管理器**: pnpm
- **网站地址**: https://qtet.070219.xyz
- **语言**: 简体中文 (zh-CN)

## 项目结构

```
qteasytier-docs/
├── astro.config.mjs      # Astro 主配置文件（含侧边栏导航配置）
├── package.json          # 项目依赖和脚本
├── tsconfig.json         # TypeScript 配置
├── public/               # 静态资源
│   ├── favicon.ico
│   └── publicserver.json
├── src/
│   ├── assets/           # 图片资源（logo 等）
│   ├── content/          # 文档内容目录
│   │   └── docs/         # 主要文档存放位置
│   │       ├── docs-home.md     # 文档首页
│   │       ├── index.mdx        # 入口页面
│   │       ├── assets/          # 文档图片资源
│   │       ├── config/          # 配置相关文档
│   │       ├── instructions/    # 使用说明文档
│   │       ├── servers/         # 服务器指南文档
│   │       ├── using/           # 使用场景文档
│   │       └── other/           # 其他文档（捐赠、免责声明等）
│   └── content.config.ts # 内容集合配置 (Starlight docsLoader)
└── dist/                 # 构建输出目录
```

## 常用命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器 (默认端口 4321)
pnpm dev
# 或
pnpm start

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 文档目录说明

| 目录 | 用途 | 当前文章 |
|------|------|----------|
| `instructions/` | 使用说明 | install, simple-using, oneclick, web-dashboard |
| `servers/` | 服务器指南 | server-instruction, public-servers-list, deploy-personal, deploy-public, nat-traversal |
| `using/` | 使用场景 | mc |
| `other/` | 其他 | donate, disclaimer |

## 文档编写规范

### 文章格式

每篇文章必须包含 YAML Front Matter：

```yaml
---
title: 文章标题
---
```

- `title` 作为文章显示标题和侧边栏文字
- 文章正文从 **H2** 标题开始，无需再写 H1

### 添加新文章

1. 在对应目录下创建 `.md` 文件
2. 在 `astro.config.mjs` 的 `sidebar` 配置中添加路由

示例配置：
```javascript
sidebar: [
  { slug: "docs-home" },
  {
    label: "使用说明",
    items: [
      "instructions/install",
      "instructions/simple-using",
      "instructions/oneclick",
      "instructions/web-dashboard",
    ],
  },
  {
    label: "服务器指南",
    items: [
      "servers/server-instruction",
      "servers/public-servers-list",
      "servers/deploy-personal",
      "servers/deploy-public",
      "servers/nat-traversal",
    ],
  },
  {
    label: "部分使用场景",
    items: ["using/mc"],
  },
  {
    label: "其他",
    items: ["other/donate", "other/disclaimer"],
  },
]
```

### 添加图片

- 图片存放于文章所在目录的 `assets/` 文件夹
- 建议对图片进行有意义的命名
- 图片引用使用相对路径

## 开发约定

- **不要随意添加新目录** - 如需添加请先与作者沟通
- **提交规范** - PR 需包含修改文件列表、内容简述、修改目的
- **目标分支** - PR 提交到 master 分支

## 技术栈

| 依赖 | 版本 | 用途 |
|------|------|------|
| astro | ^5.6.1 | 静态站点生成器 |
| @astrojs/starlight | ^0.37.6 | 文档主题 |
| sharp | ^0.34.2 | 图片处理 |

## 关键配置文件

### astro.config.mjs

- 配置网站基础信息 (title, favicon, logo)
- 配置多语言支持 (当前仅简体中文)
- 配置侧边栏导航结构

### src/content.config.ts

- 使用 Starlight 的 `docsLoader()` 加载文档
- 使用 `docsSchema()` 定义文档 schema

## 注意事项

1. 项目使用 ESM 模块 (`"type": "module"`)
2. TypeScript 使用严格模式 (`extends: "astro/tsconfigs/strict"`)
3. 开发时推荐使用 VS Code 并安装 Astro 官方插件