# 雨停之后

我的个人博客，基于 [Hexo](https://hexo.io/) + [Stellar](https://xaoxuu.com/wiki/stellar/) 主题构建，托管在 [Vercel](https://vercel.com/)。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器 (http://localhost:4000)
npm run server

# 创建新文章
npx hexo new "文章标题"
```

## 文章写作

在 `source/_posts/` 目录下创建 `.md` 文件，frontmatter 示例：

```yaml
---
title: 文章标题
date: 2026-06-11 12:00:00
categories:
  - Linux
tags:
  - Linux
  - C
---
```

## 部署

本博客通过 **Vercel** 自动部署：

1. 将代码推送到 GitHub 仓库 `main` 分支
2. Vercel 自动检测到推送，执行 `hexo generate`
3. 生成的文件位于 `public/` 目录，Vercel 自动部署

### 首次部署配置

1. 在 [Vercel](https://vercel.com) 中导入 GitHub 仓库
2. Vercel 会自动读取 `vercel.json` 配置：
   - 构建命令: `npm run build` (即 `hexo generate`)
   - 输出目录: `public`
3. 绑定自定义域名（可选）

### 手动部署（备用）

```bash
npm run build    # 生成静态文件到 public/
npm run deploy   # 部署到 GitHub Pages（需要配置 SSH）
```

## 目录结构

```
.
├── _config.yml              # Hexo 主配置
├── _config.stellar.yml      # Stellar 主题配置
├── source/                  # 源文件
│   ├── _posts/              # 博客文章
│   ├── about/               # 关于页面
│   ├── links/               # 友链页面
│   ├── tags/                # 标签页面
│   └── favicon/             # 网站图标
├── scaffolds/               # 文章模板
├── vercel.json              # Vercel 部署配置
└── package.json             # 项目依赖
```

## 许可证

博客内容采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议。
