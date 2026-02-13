# 这是QtEasyTier官网的源码库

QtEasyTier项目地址：[https://gitee.com/viagrahuang/qt-easy-tier](https://gitee.com/viagrahuang/qt-easy-tier)

## 想为QtEasyTier的文档做贡献？

如果您想为文档做贡献，欢迎提交Pull Request，作者将感激不尽。

### 文档目录

文档保存在`src/content/docs`目录下，该目录结构及其解释如下。

```
docs
├── instructions   # 对应“使用说明”目录，主要是介绍QtEasyTier的使用方法
├── servers        # 对应“服务器指南”目录，主要是介绍QtEasyTier的服务器部署与使用方法
├── using          # 对应“部分使用场景”目录，主要是介绍QtEasyTier在具体场景下的使用
├── docs-home.md   # 对应“QtEasyTier 帮助文档”页面，是帮助文档的首页
```

如果你想修改已有文章，在对应目录下找到并修改即可，若是想添加图片，请将图片储存于文章目录的assets文件夹下，最好进行有意义的重命名。

如果你想添加新文章，请在对应目录下创建新的Markdown文件，同时根目录的`astro.config.mjs`文件中添加新文章的路由, 其格式如下( 直接修改源文件即可 )。

```javascript
  // 导航栏配置
  sidebar: [
    { slug: "docs-home" },
    {
      label: "使用说明",
      items: [
        "instructions/install",
        "instructions/simple-using",
        "instructions/oneclick",
      ],
    },
    {
      label: "服务器指南",
      items: [
        "servers/server-instruction",
        "servers/deploy-personal",
        "servers/deploy-public",
      ],
    },
    {
      label: "部分使用场景",
      items: ["using/mc"],
    },
    {
      label: "其他",
      items: [
        "other/donate", 
        "other/disclaimer"
      ],
    },
  ],
```

- **在未经作者允许的情况下请勿擅自添加目录**

### 文章格式

文章总体采用Markdown格式，但每个文章的开头都需要包含一个YAML Front Matter，其格式如下。

```yaml
---
title: 文章标题
---
```

该标题将作为文章的显示标题，同时也会作为侧边导航栏显示的文字，因此，文章无需在写大标题，若在文章中使用标题文字，应从**H2**开始。

### 提交 Pr 规范

文章完成并确认无误后，便可以提交 Pull Request 到 master 分支，作者将审核并合并。

Pr 应包含以下信息：
```markdown
### 修改/添加的文件
  1. xxx
  2. xxx
### 修改/添加的内容简述
  1. xxx
  2. xxx
### 修改/添加的目的
  1. xxx
  2. xxx
```
