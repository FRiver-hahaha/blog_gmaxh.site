---
title: 国内的我也能使用claude code!
date: 2026-06-11 21:46:29
categories:
  - AI
tags:
  - AI
---

## 当前的claude code我高攀不起

起初的原因是因为，claude code实属是当下agent的顶流，我也没有理由不跟波风。但由于地域原因，claude无法在国内注册。未果。

## cc switch来了

其实已开始，我也并不知道这个软件，这多亏了我在我们专业2班的兄弟了。一经介绍之后，我今晚抽出来时间操作了一番。发现还是可以使用claude code的。其原理大致可以解释为，claude code只能匹配自己的Anthropic协议，但其他api有各自的格式协议，故使用了cc switch来作为中转站，进行代理和协议的转换。

## 磨拳擦掌开始使用claude code

我本身也并不喜欢挨着视频一分不差的看完，但经过基本的了解之后，发现claude code支持多模式切换使用，自动模式，计划模式，确认模式。  
1. 确认模式:agent提出的每个操作请求都要经过人工审核。主打稳妥。
2. 计划模式:进入规划模式，用户可以提出各类问题，来规划项目方案，或者自己的想法，claude code会智能地引导你一步步完善你的计划。节省token，计划更有体系。
3. 自动模式:agent自动执行操作请求，不经过人工审核。效率快但有风险。

了解了三种模式，我们便可以提出一次想法了。

## First try---优化博客

优化博客主要分为两个方面，代码结构和具体页面修饰。

我首先提出了一个总体的要求，之后他自动帮我把我的话整理之后，进行二次处理。  

``用户 FRiver 拥有一个基于 Hexo + Stellar 主题的个人博客（雨停之后），托管于 Vercel，仓库位于 GitHub。本次 session 的核心任务是：审查博客代码结构、执行全面优化、并打通未来的自动化部署流程。``

之后一直在自动模式下，经过几次无脑确认，就可以完成本次的代码修复，以及具体博客内容的模块调整。帮我提高了工作效率。之后我让他给我了完整的操作内容，附下。

```

Claude Code Session 总结：Hexo 博客全栈优化

任务背景

用户 FRiver 拥有一个基于 Hexo + Stellar 主题的个人博客（雨停之后），托管于 Vercel，仓库位于 GitHub。本次 session 的核心任务是：审查博客代码结构、执行全面优化、并打通未来的自动化部署流程。

本次 Session 完成的工作清单

一、代码结构审查与清理。发现根目录存在 100 多个 Hexo 生成的 HTML/JS/CSS 文件被错误提交到 Git，导致仓库膨胀、结构混乱。通过 git rm --cached 加物理删除，将仓库精简为纯源文件形态（94 files changed, +190 / -45,488 行）。

二、Git 配置修复。修复 .gitignore 中的拼写错误，添加完整的生成文件忽略规则（node_modules/、public/、db.json、.deploy*/）。删除根目录下的 2025/、2026/、about/、archives/、categories/、css/、js/、tags/ 等所有生成目录。

三、Vercel 部署配置优化。重写 vercel.json，明确指定 buildCommand 为 npm run build（即 hexo generate）和 outputDirectory 为 public，使 Vercel 能够自动从源码构建并部署。

四、依赖清理。卸载未使用的 hexo-theme-landscape 主题和 hexo-deployer-git 部署插件（用户已迁移至 Vercel，不再需要 GitHub Pages 部署），删除空的 _config.landscape.yml 和 themes/ 目录，移除 _config.yml 中过时的 deploy 配置块，删除 .deploy_git/ 缓存目录（约 12MB）。

五、Dependabot 策略优化。将依赖更新频率从「每日 20 个 PR」调整为「每周六 5 个 PR」，减少噪音。

六、文章元数据补全。为全部 16 篇文章补充 categories 字段（Linux / AI / 生活），修复标签重复问题，将 C++ 标签改为 C/C++（加号在 URL 中会导致标签页无法生成），为唯一无标签文章「慢慢走下去」补充标签。更新 scaffolds/post.md 模板，默认包含 categories 字段。

七、项目文档。创建 README.md，包含本地开发命令、文章写作示例、Vercel 部署指南和目录结构说明。

八、推送部署。将所有变更提交并推送至 GitHub，Vercel 将自动触发构建部署。

模型表现观察（基于 deepseek-v4-pro）

本次 session 使用的底层模型为 deepseek-v4-pro，通过 Claude Code 的 agent 架构驱动。以下是几个关键观察：

任务切换效率。本次 session 在「代码审查 → 结构优化 → 配置修复 → 内容编辑 → 文档撰写 → Git 操作」等多个迥异任务之间无缝切换，模型在每种任务模式下均能保持一致的输出质量，未出现上下文丢失或风格偏移。

Plan Mode 与执行模式的灵活切换。用户在前期要求「先审查再动手」，模型进入 Plan Mode 进行了全面的代码探索；确认问题后退出 Plan Mode，进入高效执行阶段。这种模式切换由 Claude Code 的 harness 层自动管理，对用户透明。

底层操作能力。模型直接操作了 git 暂存区（git rm --cached）、文件系统（批量删除生成文件）、npm 依赖管理、YAML 配置编辑、批量文本替换（Python 脚本修复 16 个文件的 frontmatter），展现了 Claude Code 作为 CLI 工具的强大底层能力。

性价比。本次 session 处理了 94 个文件的变更（+190 / -45,488 行），涵盖代码审查、结构重构、配置优化、内容编辑、文档撰写和 Git 操作等多个维度。如果人工完成这些任务，保守估计需要两到三个小时；而通过 Claude Code + deepseek-v4-pro 的组合，在单次对话中一气呵成。

中文技术内容处理。博客内容为中文技术文章（Linux 系统编程、AI 概念介绍等），模型准确理解了文章主题并为每篇文章分配了合适的分类和标签，包括对 C++ 文件名兼容性问题的识别和修复。

关键数据

文件变更：94 files changed。
新增行数：+190 行。
删除行数：-45,488 行（主要是清理的生成文件）。
修改的文章：16 篇（全部补充 categories 与标签修复）。
清理的生成目录：15 个（2025/、2026/、about/、archives/、categories/、css/、favicon/、js/、links/、page/、tags/、themes/、.deploy_git/ 等）。
卸载的冗余包：2 个（hexo-theme-landscape、hexo-deployer-git）。
编辑的配置文件：6 个（.gitignore、vercel.json、_config.yml、dependabot.yml、package.json、scaffolds/post.md）。
新建文件：2 个（README.md 与本次总结文件）。


```

## Second try---实现一个企业级的任务待办软件

最初我也没有这样的灵感，其实我也没有使用claude code的经验，多亏了[Claude Code 从 0 到 1 全攻略：MCP / SubAgent / Agent Skill / Hook / 图片 / 上下文处理/ 后台任务](https://www.bilibili.com/video/BV14rzQB9EJj/?spm_id_from=333.1387.favlist.content.click&vd_source=bfdbc24038191b349c91940b41c52430)这个视频，主播同样是[马克的技术工作坊](https://space.bilibili.com/1815948385?spm_id_from=333.788.upinfo.head.click)(他真的很厉害)。在视频开头就带着我们使用claude code来实现一个纯前端HTML的任务待办web，之后主播对项目进行了优化，加入了react + vite + TypeScript的前端框架。我心想，既然都要使用claude code了，为什么不进行一些更好的询问。  

我启用计划模式，我要做一个前后端分离的项目，让他在现有的框架下多给我一些思路，包括前端的技术，后端的实现等等。通过一系列沟通，我们敲定了计划，React + TypeScript + vite做前端处理，python + REST API做后端处理。中间我们聊了很多，包括可以不可以使用rust作后端，为什么不建议使用c++来写后端，不同的前端技术的优缺点等等。

之后在自动模式中，一切都交给claude code和deepseek了。  

最后我让他总结了整体内容，把我们的沟通对话和项目文件都传入到git仓库内，一切行云流水。  

下面是我们的session内容，附下。  

```
Session 开发记录
==================

日期：2026-06-11
目标：将 C++/Qt 桌面待办应用迁移为现代 Web 全栈应用


一、项目背景
============

原有项目是一个 C++17 + Qt5/Qt6 桌面端待办应用，功能包括：

  · 任务增删改查、完成状态切换
  · UUID 标识、JSON 文件持久化
  · 系统托盘、无边框窗口、始终置顶

代码位于 desktop-legacy/（已归档）。


二、技术选型讨论
================

2.1 前端框架选择
----------------

对比了 3 套方案：

  方案 A（选中）：React 19 + TypeScript + Vite
    优势：生态最大、招聘市场首选、TS 支持最佳
    劣势：学习曲线中等

  方案 B：Vue 3 + TypeScript + Vite
    优势：上手最简单、中文文档好
    劣势：生态略小于 React

  方案 C：Next.js（React 全栈）
    优势：开发效率最高、部署简单
    劣势：前后端耦合

  >>> 决策：选择方案 A — React + TypeScript + Vite


2.2 后端方式选择
----------------

对比了 4 种后端架构：

  纯前端（localStorage）：最快但无跨设备同步
  REST API（选中）：前后端分离、灵活、可复用
  全栈框架（Next.js）：耦合度高、迁移成本大
  BaaS（Supabase/Firebase）：供应商锁定

  >>> 决策：选择 REST API 前后端分离架构


2.3 后端语言对比
----------------

  ┌──────────┬───────────────┬───────────────────┬──────────┬──────────┐
  │ 语言     │ 框架          │ 性能（单机 CRUD） │ 开发效率 │ 结论     │
  ├──────────┼───────────────┼───────────────────┼──────────┼──────────┤
  │ Python   │ FastAPI       │   ~5k-15k QPS     │ 最高     │ 选中     │
  │ Node.js  │ Express/Hono  │   ~10k-30k QPS    │ 高       │ 备选     │
  │ Rust     │ Axum/Actix    │   ~200k+ QPS      │ 中       │ 性能最强 │
  │ C++      │ Drogon/Crow   │   ~200k+ QPS      │ 最低     │ 不推荐   │
  └──────────┴───────────────┴───────────────────┴──────────┴──────────┘

  >>> 决策：Python + FastAPI — 对 todo 应用性能完全够用，开发效率最高，
      自动生成 Swagger 文档。


2.4 数据库选择
--------------

  >>> 决策：SQLite — 嵌入式、零配置、单文件、todo 规模完全匹配。


三、最终技术栈
==============

  前端        React 19 + TypeScript + Vite
  样式        TailwindCSS v4
  状态管理    Zustand + TanStack Query
  HTTP        Axios
  后端        Python FastAPI
  ORM         SQLModel
  数据库      SQLite
  包管理      npm（前端）+ uv（后端）


四、实现过程
============

Step 1：前端项目初始化
----------------------

  $ npm create vite@latest frontend -- --template react-ts
  $ npm install @tanstack/react-query axios zustand uuid lucide-react \
      tailwindcss @tailwindcss/vite

  · 配置 vite.config.ts：TailwindCSS 插件 + /api 代理
  · 配置 index.css：Tailwind v4 入口
  · 创建目录结构：api/、hooks/、store/、components/、types/


Step 2：后端项目初始化
----------------------

  $ uv init --name todo-api
  $ uv add fastapi uvicorn sqlmodel

  · main.py：FastAPI 入口 + CORS 中间件 + lifespan 建表
  · models.py：SQLModel Task 模型
  · database.py：SQLite 引擎
  · schemas.py：Pydantic 请求/响应模型


Step 3：后端 CRUD API
---------------------

实现 5 个 REST 端点（routes/tasks.py）：

  GET    /api/tasks            获取所有任务
  POST   /api/tasks            添加任务
  PATCH  /api/tasks/{id}       更新任务
  DELETE /api/tasks/{id}       删除任务
  DELETE /api/tasks/completed  清除已完成

【踩坑记录 1】
  问题：使用 engine.begin() 返回 Connection 对象而非 Session，导致 exec()、add()
        等方法报 AttributeError。
  解决：改用 Session(engine)。

【踩坑记录 2】
  问题：FastAPI 路由匹配顺序 — DELETE /tasks/completed 被 DELETE /tasks/{task_id}
        当作路径参数捕获，返回 404。
  解决：将 /tasks/completed 路由定义在 /tasks/{task_id} 之前。


Step 4：前端 API 层 + Hooks
---------------------------

  · types/task.ts：Task、TaskCreate、TaskUpdate 接口
  · api/tasks.ts：5 个 axios 请求函数
  · hooks/useTasks.ts：TanStack Query useQuery + 5 个 useMutation
  · store/useAppStore.ts：Zustand 全局错误状态


Step 5：React 组件
------------------

按叶子到根的顺序实现：

  TaskItem -> TaskList -> TaskInput -> StatusBar -> TitleBar -> App

数据流：TanStack Query 管理服务端状态，变更后 invalidateQueries(['tasks'])
自动重新获取。


Step 6：样式打磨
----------------

  · TailwindCSS 原子化样式
  · 自定义滚动条（暗色模式适配）
  · Checkbox 强调色
  · Hover 状态过渡动画
  · 删除按钮 hover 显示


Step 7：端到端验证
------------------

全部 5 个 API 通过 curl 集成测试：

  POST /api/tasks x3 -> GET -> PATCH toggle -> DELETE completed -> GET 验证

Vite dev server proxy 验证通过（localhost:5173/api/tasks -> localhost:8000/api/tasks）

TypeScript 类型检查 + Vite production build 均通过。


五、项目整理
============

  · 旧 C++/Qt 代码归档至 desktop-legacy/
  · 项目重命名为 todo_list_for_you
  · 编写 .gitignore、README.md、SESSION.md
  · Git 初始化并提交（49 files, 5801 lines）


六、未实现功能（后续计划）
==========================

  · 拖拽排序（@dnd-kit）
  · PWA 离线支持
  · 手动深色/浅色模式切换
  · 用户认证 & 多用户
  · Docker 一键部署
  · WebSocket 实时同步

```

## What's more---清理ubuntu不重要文件

Linux下一切皆文件，无论从硬盘大小，还是理解Linux底层内容，优化一下文件还是很有必要的。  

人生苦短，我选择使用claude code。  

这次我的prompt非常简单:帮我整理一下我Linux系统下的所有文件，并且清理一些不需要文件，在清理的时候我要逐个确认。  

这里我先开启计划模式，万一claude code能给一些更好的清理方案呢？但claude code使用最直白，最不拐弯抹角地方式告诉我:这个直接操作就可以了，现在可以进入执行模式。`:)`  

确认进入自动模式之后，他对每个需要清理的请求都想我提出了询问，并且我也保持确认，之后请求我也让他直接通过就好，不需要再提问。  

值得说的一点是，claude code真的会分析每个目录，因为他在某个目录下我记得递归搜索的时间很长，长达8分钟。  

整体的清理还是很多的，从系统缓存，到一些下载内容，更新软件的缓存等等，清理的很干净。

我同样让他给我了完整的session内容，附下。

```
Linux 系统文件清理总结

日期：2026-06-11
操作人：friver（Claude Code 辅助）

本次操作的目的是整理本机 Linux 系统中的冗余文件，释放根分区磁盘空间。在清理过程中，每一项操作均经过确认，避免了误删重要数据。


一、清理前的磁盘状况

清理前，系统根分区 /dev/nvme0n1p5 总容量为 79G，已使用 74G，仅剩 1.1G 可用空间，使用率高达 99%，磁盘空间已经严重不足。home 目录总计占用约 43G，其中缓存类文件占据了相当大的比例，是本次清理的重点对象。


二、已执行的清理操作

以下是按照清理优先级逐项执行的内容，共计 8 个步骤，累计释放约 19G 空间。

第一步：清空回收站（释放约 913M）

回收站位于 ~/.local/share/Trash/，其中堆积了大量此前删除但未彻底清除的文件。主要内容包括 YOLO 训练用的标注图片文件、一些已过时的 deb 安装包（VS Code、Clash Verge 等）、若干视频文件以及 PDF 文档。这些文件此前已被用户主动放入回收站，直接清空不存在误删风险。

第二步：清理 pip 下载缓存（释放约 5.6G）

pip 是 Python 的包管理工具，每次执行 pip install 时下载的包文件会被缓存至 ~/.cache/pip/。清理后不影响任何已安装的 Python 包，若将来需要重新安装，pip 会自动重新下载。

第三步：清理 VS Code C++ 工具缓存（释放约 6.5G）

~/.cache/vscode-cpptools/ 是 VS Code 的 C/C++ 扩展在提供 IntelliSense 智能提示时生成的索引缓存。这一项是本次清理中最大的一笔单项缓存，清理后 VS Code 会在下次打开 C++ 项目时自动重建索引。

第四步：清理浏览器及系统杂项缓存（释放约 950M）

这一步骤涵盖了多个小型缓存目录，汇总起来体量可观：

  - ~/.cache/google-chrome/（629M）：Google Chrome 浏览器缓存，包括网页资源、图片等；
  - ~/.cache/thumbnails/（123M）：GNOME 桌面环境的缩略图缓存；
  - ~/.cache/pnpm/（111M）：pnpm 包管理器的下载缓存；
  - ~/.cache/node-gyp/（65M）：Node.js 原生模块编译缓存；
  - ~/.cache/uv/（56M）：uv 包管理器的缓存；
  - ~/.cache/tracker3/（37M）：GNOME 文件索引服务的缓存；
  - ~/.cache/nvidia/（16M）：NVIDIA 驱动相关缓存；
  - 其余更小的缓存包括 typescript、flatpak、mesa_shader、fish、fontconfig、ibus、gstreamer、matplotlib、evolution 等。

第五步：清理 npm 缓存（释放约 1.1G）

npm 是 Node.js 的包管理工具，~/.npm/ 中保存了所有曾经下载过的 npm 包的缓存副本。通过执行 npm cache clean --force 清除了这些缓存，不影响已安装在各个项目中的 node_modules。

第六步：清理 Conda 包缓存（释放约 3.3G）

Conda 会将所有下载过的包文件保留在 ~/miniconda3/pkgs/ 中，即便是已经安装完毕的包也不会自动删除。执行 conda clean --all --yes 后共清理了 228 个 tarball 包文件、1 个索引缓存和 15 个已解压的包目录。清理不会影响任何已创建的 conda 环境。

第七步：清理 VS Code 配置目录中的缓存（释放约 810M）

~/.config/Code/ 是 VS Code 的配置目录，其中混杂着用户配置和缓存数据。本次清理时特别区分了缓存与配置：

  - 已清理：CachedExtensionVSIXs（618M，扩展安装包缓存）、Cache、CachedData、GPUCache、DawnGraphiteCache、DawnWebGPUCache、logs、CachedProfilesData 等纯缓存目录；
  - 已保留：User/（122M，用户设置和快捷键配置）、WebStorage/（155M，扩展的本地存储数据），这两项目录包含个人配置，不可删除。

第八步：清理下载目录中的安装包（释放约 1.3G）

~/下载/ 目录中堆积了多个已完成安装的 deb 安装包和 shell 安装脚本。这些文件仅用于初次安装，安装完成后即无保留价值。被删除的文件清单如下：

  - Feishu-linux_x64-7.66.10.deb（418M）—— 飞书
  - WeChatLinux_x86_64.deb（203M）—— 微信 Linux 版
  - QQ_3.2.26_260319_amd64_01.deb（166M）—— QQ Linux 版（新版）
  - QQ_3.2.26_260311_amd64_01.deb（166M）—— QQ Linux 版（旧版）
  - UnityHubSetup-amd64.deb（155M）—— Unity Hub
  - google-chrome-stable_current_amd64.deb（125M）—— Google Chrome
  - Miniconda3-py38_22.11.1-1-Linux-x86_64.sh（62M）—— Miniconda 安装脚本
  - CC-Switch-v3.16.2-Linux-x86_64.deb（15M）—— CC-Switch 切换工具


三、清理后的磁盘状况

经过以上 8 个步骤的清理，根分区的磁盘使用情况得到明显改善：已用空间从 74G 降至 55G，可用空间从 1.1G 扩大到 20G，使用率从不堪重负的 99% 降到了较为健康的 74%，累计释放了约 19G 空间。


四、未处理的可清理项目

以下目录在本次清理中暂未处理，因为它们属于应用数据或运行环境，需要根据实际使用情况自行判断是否删除：

  - ~/.config/QQ/（1.6G）：QQ 的缓存和聊天数据，如聊天记录中存在重要信息则不应删除；
  - ~/.config/unityhub/（3.7G）：Unity Hub 的编辑器下载和项目缓存，若已不使用 Unity 开发可以整目录删除，这是剩余项中最大的一笔；
  - ~/.local/share/nvm/（2.0G）：nvm（Node Version Manager）安装的 Node.js 各版本文件，如需继续使用 Node.js 开发请保留；
  - ~/.rustup/（1.5G）：Rust 工具链和组件，若不再使用 Rust 可以卸载删除；
  - ~/qemu-5.1.0/（1.1G）：QEMU 5.1.0 的源代码目录，若已经编译安装完毕且不再需要源码，可以安全删除；
  - ~/gitclone/（1.5G）：多个 Git 仓库，大部分为课程项目的代码，可按需清理已完成或不再需要的仓库；
  - ~/miniconda3/envs/（约 6.4G）：7 个 conda 虚拟环境，其中 yolo 环境独占 5.3G，可按需删除不再使用的环境；
  - ~/.vscode/extensions/（2.0G）：VS Code 安装的扩展，一般不建议手动删除，可通过 VS Code 界面管理；
  - ~/文档/xwechat_files/（421M）：微信客户端接收的文件。


五、清理经验总结

通过本次清理，可以总结出以下几类文件的处置原则，供日后参考：

第一，缓存目录（~/.cache/*、npm cache、conda pkgs 等）是可随时清理的安全项，不会影响任何已安装软件的正常运行，软件会在需要时自动重建缓存。

第二，安装包文件（.deb、.sh 等）在对应软件安装完成后即失去价值，可以放心删除。

第三，回收站应养成定期清空的习惯，避免已删除的文件持续占用磁盘。

第四，IDE 缓存（VS Code 的 CachedExtensionVSIXs、CachedData 等）可以清理，IDE 会在下次启动时按需重建，但要注意区分缓存与用户配置目录，不要误删个人设置。

第五，运行环境（conda envs、nvm、rustup 等）在删除时需谨慎判断，只删除确定不再使用的部分，避免影响开发工作。

第六，应用数据（QQ、微信、Unity Hub 等）往往包含用户个人数据，清理前务必确认不再需要。


六、定期维护命令参考

日常可以使用以下命令快速检查并清理磁盘：

  清空回收站：
  rm -rf ~/.local/share/Trash/files/*

  清理 pip 缓存：
  pip cache purge

  清理 conda 缓存：
  conda clean --all --yes

  清理 npm 缓存：
  npm cache clean --force

  查看磁盘使用情况：
  df -h /
  du -sh ~/* ~/.[!.]* | sort -rh | head -20


本操作由 Claude Code 辅助完成，所有删除操作均已逐项与用户确认。

```

## 小总结

在我看来，claude code的使用可以分为3步。

1. 确认好本次目标：我是要让claude code干什么，比如我是要让他写一份计划？帮我清理一下文件？帮我改个代码？帮我梳理一下代码结构？
2. 先无脑使用计划模式，之后按需使用自动模式：使用计划模式首先可以减少token的消耗，只做计划，不做操作，而且能给我们很多的计划方案。其次真的需要操作了，claude code也会智能地给我们请求，用户确认就可以。对于自动模式，遇到一些高风险，重要文件，应当使用确认模式，其他时候使用自动模式效率更高。
3. 总结本次session内容：总结在我看来，不仅可以梳理本次对话的内容，知道今天做了什么，按部就班。也能让之后重新开启的对话，可以直接读取本次的session，来对接任务，避免重新执行一些高消费token的操作来对接需求。其实也有利于写博客~

## 值得夸赞的地方

对于本次的对话，我最满意的是deepseek的高性价比。今天的这三个session，只消费了2.80人民币，价格不如一根烤肠。而且claude code的对话十分健全，帮我很多。

## 后续

其实对于token的消耗，可以有更好的优化方案，比如使用计划模式，使用token saver cc等。

剩下的视频还没看完，还有更多的功能继续解锁，等我看完继续聊～
