---
title: 在OpenTenBase完成一次pr
date: 2026-11-07 17:01:46
categories:
tags:
---

# 第一次给 OpenTenBase 提 PR：4 行改动，我踩了 5 个坑

> 从 issue #382 到 PR #513 的完整记录。如果你也打算给这个项目（或任何大型 C/C++ 开源仓库）提第一个 PR，这篇能帮你省掉我浪费的那两个小时。

---

## 起因：一个"看起来很水"的 issue

在翻 OpenTenBase 仓库时，我看到了 issue #382：

> 在我阅读文档期间发现或多或少的错别字以及步骤缺失的问题，导致阅读起来不便于理解，尤其对于新手，希望可以注重这方面的问题。

说得很客气，但意思很明确：**文档不好读，新手卡住了。**

这类 issue 通常没人接——修错别字既不出活也不露脸。但对一个想完成"第一次开源贡献"的人来说，它是最好的入口：范围清晰、风险低、确实有用。

我决定把它做掉。

---

## 第一步：先搞清楚"改哪儿"

动手前有个岔路必须先判断，否则 PR 会提到错的仓库。

我把仓库翻了一遍，发现有三种"文档"：

| 位置 | 情况 | 能不能改 |
|---|---|---|
| `doc/src/sgml/` 下 189 个文件 | 全是英文 DocBook，PostgreSQL 原生手册 | 不能。这是上游同步内容，改了会和上游冲突 |
| `README_ZH.md`、`CONTRIBUTING_ZH.md`、`v2.x-release-note.txt` | 全仓库仅 8 个含中文的文件 | 能，这就是目标 |
| docs.opentenbase.org | 独立站点，不在这个仓库 | 不在范围内 |

**第一个认知**：OpenTenBase 主仓库里其实几乎没有中文文档，只有根目录那几个 Markdown。issue 里说的"文档"，大概率就指 `README_ZH.md`。

于是我用 `README_ZH.md` 通读了一遍，记下 5 处可疑的地方。

---

## 第二步：一个比错别字严重得多的问题

在准备提 PR 时，我按 `CONTRIBUTING_ZH.md` 的要求，准备把分支基于 `dev` 创建。

结果 `git clone --branch dev` 直接报错：

```
fatal: Remote branch dev not found in upstream origin
```

我去查了上游的真实分支：

```
$ git ls-remote --heads https://github.com/OpenTenBase/OpenTenBase.git
4c66f17...  refs/heads/REL_18_STABLE
d446ca2...  refs/heads/REL_19_STABLE
123e2b3...  refs/heads/master
5c7f52d...  refs/heads/v2.5.0-release_new
e16241d...  refs/heads/v2.6.0-release_new
7a42c7d...  refs/heads/v2.6.0_summer2024
c4265f9...  refs/heads/v2.6.0_summer2025
760b030...  refs/heads/v5.0-release_new
```

**没有 `dev` 分支。**

而 `CONTRIBUTING_ZH.md` 最后一条明确写着：

> 6. 然后，您可以将代码提交到 dev 分支

这条过时的文档，比错别字严重得多——**每一个按指南操作的新贡献者，第一步就会卡住**。这恰恰是 issue #382 说的"步骤缺失导致新手难以理解"。

所以正确的 base 分支是 `master`。这条我写进了 PR 描述的"顺带反馈"里。

---

## 第三步：环境坑（这里花了我 80% 的时间）

### 坑 1：`git` 命令报 `Exec format error`

在 WorkBuddy 的终端里执行任何 `git` 命令，得到的都是：

```
/mingw64/bin/git: cannot execute binary file: Exec format error
```

连 `ls` 都一样。看起来像"没装 git"。

但执行 `where git` 才发现真相：

```
C:\Users\...\.workbuddy\vendor\PortableGit\mingw64\bin\git.exe
D:\Git\cmd\git.exe
```

**系统里装了两个 git**，PATH 里先命中的是 WorkBuddy 自带的那个，架构不匹配、根本跑不起来。而真正能用的是 `D:\Git\cmd\git.exe`（v2.55.0）。

> 教训：命令报错先别急着装东西，`where` 一下，看看是不是被别的副本抢了 PATH。

### 坑 2：本地源码包和仓库里的文件根本不是一套

我手上有一份下载的源码包，里面的 `README_ZH.md` 是 20848 字节。但 clone 下来仓库里的版本是 **21354 字节**。

一开始以为内容差很多，做 `git diff` 却输出为空——**两版内容完全一样，只差换行符**：

- 仓库里是 **CRLF**（21354 − 20848 ≈ 507，正好是行数）
- 源码包里是 **LF**

这意味着：如果我按 LF 改完再提交，`git diff` 会显示**整个文件全部被改动**，PR 直接作废。

所以改文件时我用字节级替换，只动行内内容，严格保留 CRLF。

> 教训：**改中文 Markdown 前，先确认换行符。** `git diff --stat` 如果显示几百行 deletions，100% 是换行符炸了。

### 坑 3：稀疏克隆会让 commit 变成灾难

考虑到仓库很大（8000+ 文件、560 万行），我用了稀疏克隆想省流量：

```bash
git clone --filter=blob:none --sparse --depth 1 ...
```

结果第一次 commit 的输出是这个：

```
[fix/docs-typo-382 (root-commit) c807116] docs: fix typos ...
 8426 files changed, 5615834 insertions(+)
```

**它把我改的 4 行，变成了"新建 8426 个文件"。**

第二次换了做法，又变成：

```
 8426 files changed, 4 insertions(+), 5615332 deletions(-)
```

这次是"删除了 8426 个文件"。

根因是 `--sparse` 依赖 `skip-worktree` 标志，一旦这个标志在某些操作后丢了，git 就会把"工作区里看不见的文件"当成"被删除"。

> 教训：**要提 PR 就老老实实普通 clone。** 稀疏克隆/部分克隆是给读代码用的，不是给提交用的。

### 坑 4：分支名带斜杠，ref 写不进去

这个坑最隐蔽。

我先用了社区惯例的分支名 `fix/docs-typo-382`。`checkout -b` 显示成功，但紧接着：

- `git commit` 变成 root-commit（把整个仓库当成第一次提交）
- 或者 commit 后 `refs/heads/fix/docs-typo-382` 文件凭空消失
- `git log` 报 `your current branch does not have any commits yet`

做了个最小实验才定位到：**每次写 index / ref 之后，这个嵌套目录形式的 ref 就被清掉了**。

```bash
# 嵌套 ref（refs/heads/fix/xxx）—— 失败
git checkout -b fix/docs-typo-382

# 一级 ref（refs/heads/xxx）—— 正常
git checkout -b docs-typo-382
```

换成不带斜杠的分支名，`status` 立刻变成干净的 0 条变更，提交一次成功。

> 教训：分支名带斜杠很规范，但如果遇到 ref 异常，先用一级名字排除掉这个变量。

### 坑 5：commit 输出太多，把管道撑爆了

排查过程中我一度以为是"管道导致进程被杀"：commit 那几千行文件列表输出，在管道里读完就被提前关闭，git 收到 SIGPIPE 后直接中断，ref 还没写完就挂了。

所以后来我所有 commit 都加 `-q`：

```bash
git commit -q -m "docs: fix typos and malformed table in README_ZH" -m "Fixes #382"
```

输出干净，问题也随之消失。

---

## 第四步：改什么，和不改什么

最后落地的改动只有 4 处：

| # | 位置 | 问题 |
|---|---|---|
| 1 | L74 | visudo 说明写成 `"% wheel"`，实际配置项是 `%wheel`，多一个空格，新手按文搜索搜不到 |
| 2 | L210 | 表格分隔行末尾多一个 `\|`，导致"字段说明"表格渲染断裂 |
| 3 | L425 | 路径 `/home/opentenbase/.../opentenbase/5.21.8/...` 与其他章节的 `/data/.../opentenbase_bin_v5.0` 矛盾 |
| 4 | L506 | `[history_events](history_events.md)` 指向仓库里不存在的文件 |

但我觉得**比"改了什么"更重要的是"刻意没改什么"**。

比如 L417 那段 `status` 命令的输出示例里，同样出现了 `install/opentenbase/5.21.8`。看起来和 L425 是一样的问题，但那是**终端的真实回显**——示例输出必须保持原样，改了就等于伪造运行结果。

又比如英文版 `README.md` 的 L514 有同一个死链，但那属于中英文混改，我留作单独的 PR。

我把这些都写进了 PR 描述，因为**光看 diff，评审者看不出来你是"想清楚了"还是"全局搜索替换"**。

最终 diff 非常干净：

```
README_ZH.md | 8 ++++----
1 file changed, 4 insertions(+), 4 deletions(-)
```

---

## 第五步：提交、PR、CLA

```bash
git clone https://github.com/<你的ID>/OpenTenBase.git
git remote add upstream https://github.com/OpenTenBase/OpenTenBase.git
git checkout -b docs-typo-382 origin/master

# 改文件...

git diff --stat          # 确认只有 4 行变动
git add README_ZH.md
git commit -q -m "docs: fix typos and malformed table in README_ZH" -m "Fixes #382"
git push -u origin docs-typo-382
```

PR 建好之后遇到一个新东西：**CLA**。

`license/cla` 一直挂着 `Contributor License Agreement is not signed yet`，不签这个 PR 永远不会被合入。

这是开放原子开源基金会的**个人贡献者许可协议（ICLA，2024-06-26 版）**，主要内容是：

- 你授予基金会**永久、非独占、全球、免费、不可撤销**的著作权许可和专利许可
- 除此之外，你**保留贡献的所有权利**
- 如果贡献是在雇主（或实习公司/实验室）期间完成的，需要先获得授权

对这几行文档改动来说，它其实没有实际风险，但流程是硬性的：**签一次，覆盖你以后对该组织的所有贡献**。

签完之后，`GITHUB_OPENSOURCE_SCAN_PIPELINE`（腾讯的合规扫描）也通过了，0 安全漏洞，PR 进入人工评审队列。

---

## 复盘：这次真正学到的东西

**1. 小 PR 的价值不在代码量，在"可验证"**
4 行改动，评审者 30 秒能看完。这种 PR 被合入的概率，远高于一个 500 行的"重构+修复+优化"混合包。

**2. 文档过时比代码 bug 更坑人**
`CONTRIBUTING_ZH.md` 让人提 PR 到 `dev` 分支，但仓库没有这个分支。这种问题不会让程序崩溃，只会让每个新人第一步就卡住——而且没人会来报 bug。

**3. 环境问题往往不是"没装"，而是"装了两个"**
`Exec format error` 看起来像缺依赖，实际是 PATH 被抢占。学会 `where` / `which -a` 比急着重装有效得多。

**4. 提 PR 前的自检，比提 PR 本身重要**
`git diff --stat` 那一行输出，能一次性暴露换行符炸了、稀疏克隆出错、分支建错三种问题。

**5. 描述比 diff 更能体现你是不是"想清楚了"**
diff 告诉别人你改了什么，描述告诉别人你为什么这么改、为什么不那么改。

---

