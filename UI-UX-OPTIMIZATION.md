# QtEasyTier 主页 UI/UX 优化文档

> 基于 ui-ux-pro-max 设计系统最佳实践

## 📋 当前状态分析

| 项目 | 当前状态 |
|------|----------|
| 框架 | Astro + Starlight |
| 主题色 | 蓝色系 (rgb(102, 204, 255)) |
| 背景 | 全屏背景图 + 半透明遮罩 |
| 图标 | 使用 emoji (💻🎮) |
| 布局 | Hero + CardGrid |

---

## 🎯 优先级优化项

### P0 - 必须修复 (Critical)

#### 1. 图标问题 - 禁止使用 Emoji 作为 UI 图标

**当前代码 (index.mdx:35,41):**
```jsx
<Card title="💻 远程组网" ...>
<Card title="🎮 游戏联机" ...>
```

**问题：** Emoji 作为 UI 图标不符合专业设计标准，不同平台显示不一致

**修复方案：** 使用 SVG 图标 (Heroicons / Lucide)

```jsx
import { NetworkIcon, GameControllerIcon } from '@astrojs/starlight/components';

// 或使用 Starlight 内置图标
<Card title="远程组网" icon="seti:network">
<Card title="游戏联机" icon="game-controller">
```

#### 2. 焦点状态 - 键盘导航可访问性

**检查清单：**
- [ ] 所有交互元素有可见的 focus ring
- [ ] Tab 顺序与视觉顺序一致
- [ ] 使用 `focus-visible` 样式

```css
/* global.css 添加 */
:focus-visible {
  outline: 2px solid var(--sl-color-accent);
  outline-offset: 2px;
}
```

#### 3. 动画 - 尊重用户运动偏好

**问题：** 当前页面可能有动画但未检查 `prefers-reduced-motion`

```css
/* global.css 添加 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

### P1 - 强烈建议 (High Priority)

#### 4. 悬停反馈 - cursor-pointer 与过渡效果

**问题：** 卡片元素缺少悬停状态视觉反馈

**当前代码 (index.mdx:34-46):**
```jsx
<CardGrid>
    <Card title="...">...</Card>
    <Card title="...">...</Card>
</CardGrid>
```

**优化方案：**
```css
/* global.css 添加 */
.custom-card {
  cursor: pointer;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.custom-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
}
```

#### 5. CTA 按钮对比度

**当前代码 (index.mdx:20-27):**
```jsx
actions:
  - text: 快速开始
    link: /docs-home
    icon: right-arrow
  - text: 前往软件仓库
    link: https://gitee.com/viagrahuang/qt-easy-tier
    variant: minimal
```

**问题：** minimal 变体可能对比度不足

**建议：** 使用对比色 (橙色 #F97316) 作为 CTA，强调行动号召

```yaml
actions:
  - text: 快速开始
    link: /docs-home
    icon: right-arrow
    variant: primary  # 使用主色填充按钮
  - text: 前往软件仓库
    link: https://gitee.com/viagrahuang/qt-easy-tier
    variant: accent   # 使用强调色
```

#### 6. 移动端触摸目标

**检查清单：**
- [ ] 按钮最小尺寸 44x44px
- [ ] 卡片在移动端有足够点击区域
- [ ] 水平滚动检查 (确保 content fits viewport)

---

### P2 - 建议优化 (Medium Priority)

#### 7. 字体排版优化

**推荐字体配对 (基于 ui-ux-pro-max):**
- Heading: **Outfit** - 几何、现代、简洁
- Body: **Work Sans** - 清晰、可读性强

**当前问题：** 使用默认字体，可能不够美观

```css
/* global.css 添加 */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&display=swap');

:root {
  --sl-font-heading: 'Outfit', sans-serif;
  --sl-font-body: 'Work Sans', sans-serif;
}
```

#### 8. 颜色系统优化

**推荐调色板 (软件工具类):**

| 用途 | 颜色 | Hex |
|------|------|-----|
| Primary | Sky Blue | #0EA5E9 |
| Secondary | Light Sky | #38BDF8 |
| CTA | Orange | #F97316 |
| Background | Light Blue | #F0F9FF |
| Text | Dark Slate | #0C4A6E |

**当前设置 (global.css:3-6):**
```css
:root {
  --sl-hue: 200;
  --sl-color-accent: rgb(102, 204, 255);  /* 可调整更深的蓝色 */
}
```

#### 9. Hero 区域增强

**当前 (index.mdx:16-27):**
```yaml
hero:
  tagline: 基于 EasyTier, 一款美观实用的远程联机工具!
  image:
    file: ../../assets/qtet.png
  actions:
    - text: 快速开始
      link: /docs-home
```

**建议增强项：**
- 添加简短描述 (description) 补充 tagline
- 主按钮使用填充样式 (primary variant)
- 次按钮使用边框样式

```yaml
hero:
  tagline: 基于 EasyTier, 一款美观实用的远程联机工具!
  description: 简单易用的 P2P 联机组网软件，支持游戏联机、远程桌面、NAS 访问
  image:
    file: ../../assets/qtet.png
  actions:
    - text: 快速开始
      link: /docs-home
      icon: right-arrow
      variant: primary  # 填充按钮
    - text: GitHub
      link: https://github.com/myqfeng/qt-easy-tier
      icon: seti:git
      variant: minimal  # 边框按钮
```

#### 10. 社交证明区域

**建议添加用户评价/使用场景区域：**

```jsx
## 💬 用户评价

<CardGrid>
  <Card title="游戏联机">
    "和宿舍同学联机 MC 超级稳定，延迟很低！"
    — 某大学生
  </Card>
  <Card title="远程办公">
    "在家也能访问公司内网，组网超简单"
    — 某上班族
  </Card>
</CardGrid>
```

---

### P3 - 可选优化 (Low Priority)

#### 11. 动画微交互

| 元素 | 动画类型 | 时长 |
|------|----------|------|
| 卡片悬停 | translateY + shadow | 200ms |
| 按钮点击 | scale(0.98) | 100ms |
| 页面进入 | fade-in | 300ms |

#### 12. Loading 状态

如果未来有异步内容，添加骨架屏：
```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

---

## 📱 响应式断点检查

| 断点 | 宽度 | 检查项 |
|------|------|--------|
| Mobile | 375px | 文字可读、按钮可点、无横向滚动 |
| Tablet | 768px | 卡片布局自适应 |
| Desktop | 1024px+ | 最佳显示效果 |

---

## ✅ 优化检查清单

### 视觉质量
- [ ] 移除 emoji 图标，改用 SVG
- [ ] 统一图标风格 (Heroicons/Lucide)
- [ ] hover 状态有视觉反馈
- [ ] 过渡动画 150-300ms

### 交互
- [ ] 所有可点击元素 cursor-pointer
- [ ] focus 状态可见
- [ ] 触摸目标 ≥44px

### 可访问性
- [ ] prefers-reduced-motion 支持
- [ ] 颜色对比度 ≥4.5:1
- [ ] 键盘可导航

### 性能
- [ ] 图片使用 WebP 格式
- [ ] 背景图 lazy loading
- [ ] 动画使用 transform/opacity

---

## 🔧 快速修复代码

将以下代码添加到 `src/styles/global.css`:

```css
/* ========== P0: 可访问性修复 ========== */
:focus-visible {
  outline: 2px solid var(--sl-color-accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ========== P1: 悬停反馈 ========== */
.custom-card {
  cursor: pointer;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.custom-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
}

/* ========== P2: 字体优化 (可选) ========== */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&display=swap');

:root {
  --sl-font-heading: 'Outfit', sans-serif;
  --sl-font-body: 'Work Sans', sans-serif;
}
```

---

## 📝 总结

| 优先级 | 数量 | 预计影响 |
|--------|------|----------|
| P0 Critical | 3 | 可访问性合规 |
| P1 High | 3 | 用户体验显著提升 |
| P2 Medium | 4 | 专业度提升 |
| P3 Low | 2 | 细节打磨 |

**建议执行顺序：** P0 → P1 → P2 → P3

> 生成时间: 2026-02-17
> 基于 ui-ux-pro-max design system (software documentation pattern)
