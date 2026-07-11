# 项目进程

记录博客开发过程中的关键迭代、决策与背景。

## 版本

### v0.1.0 — 2026-07-11

**新增**

- 独立音乐空间：4 首听歌短记、4 份 Apple Music 真实歌单索引、逐曲预览与 B 站视频 / 搜索入口。
- 四份公开歌单重新策展为“私藏声场 / 未寄出的低语 / 无人的深夜 / 霓虹余温”，同时保留 Apple Music 原名作为来源标识。
- 小红书 `JackyUnique` 入口与真实文章搜索。
- 评论区中英双语、加载重试、可访问表单与本地 D1 验证闭环。

**设计升级**

- 统一为“深色独立杂志 × 私人听觉档案”；音乐空间单独使用冷黑、骨白与低饱和灰蓝，强化极简、孤独与忧郁的听觉氛围。
- 重做首页、导航、文章索引、背景氛围、社交与联系卡片；补齐移动端和减少动效适配。

**工程与安全**

- 评论 Worker 增加来源校验、16 KB 请求限制、Turnstile action / hostname 校验、超时与真实健康检查。
- GitHub Pages 构建支持注入评论公开变量；Wrangler 固定版本。
- 升级 Vite 与 React Router 的兼容安全版本；`npm audit` 为 0。

### v0.0.2 — 2026-04-18

相对 v0.0.1 的变化：

**变更**

- `src/pages/About.jsx`：技能列表更新
  - 移除 `C++ (greenhand)` → 改为 `C++`
  - 新增 `C`
  - 新增 `Vibe Coding (in progress)`
- `src/i18n/dictionary.js`：兴趣描述更新
  - 中文：新增"建网站"、"喜欢有趣的人"
  - 英文：新增 "web development"、"I enjoy meeting interesting people"
- `package.json`：版本号 `0.0.1` → `0.0.2`

**说明**：v0.0.2 是**关于页内容**的小幅更新，反映用户技能与兴趣的最新状态。

### v0.0.1 — 2026-04-18

相对 v0.0.0 的变化：

**新增**

- `PROGRESS.md`：项目进度时间线，用于记录关键迭代、决策与背景。

**变更**

- `.gitignore`：新增 `Blog依赖/`，确保用户的内部素材目录（含个人信息与未公开草稿）不被上传 GitHub。
- `package.json` / `package-lock.json`：版本号 `0.0.0` → `0.0.1`。

**说明**：v0.0.1 是**文档与协作流程**的版本，未触及任何运行时源码（`src/`、`public/`、构建配置均未变），博客功能与 v0.0.0 完全一致。

## 时间线

### 2026-04-18

- **v0.0.2**：更新关于页内容
  - 技能列表：移除 "C++ (greenhand)" 标签 → 改为 "C++"，新增 "C" 和 "Vibe Coding (in progress)"
  - 兴趣描述：中文新增"建网站"、"喜欢有趣的人"；英文新增 "web development"、"I enjoy meeting interesting people"
  - 修改文件：`src/pages/About.jsx`、`src/i18n/dictionary.js`、`package.json`、`PROGRESS.md`
  - 提交 `5c6c0ea` 已推送至 `origin/main`
- 建立 `PROGRESS.md`（仓库根目录），记录项目导航、约定、版本变化与关键决策，避免后续维护时丢失上下文。
- **保护个人信息**：将 `Blog依赖/`（用户内部素材目录，含个人信息与未公开草稿）加入 `.gitignore`。该目录尚未被 git 跟踪，所以仅 .gitignore 即可，无需 `git rm --cached`。
- 版本 `0.0.0 → 0.0.1`，提交 `43bbb5f` 已推送至 `origin/main`（https://github.com/JackyHu0314/Blog）。变更范围见上方"版本"章节。

## 当前状态快照

- 主框架与路由：`Landing` `Journal` `JournalDetail` `About` `Projects` `Research`
- 双语（zh/en）+ 双主题（cosmic-dark 默认 / anime-light）
- 内容数据源：`src/data/journals.js` `projects.js` `research.js`（JS 对象数组形式）
- 自定义极简 markdown parser 在 `src/pages/JournalDetail.jsx` 顶部（支持 `## ### ####` `> ` `- ` `**粗体**`）
- 已发布随记示例：`lost-and-rebuild`（2026-04-10）

## 决策记录

- **不引入 react-markdown / MDX**：自定义 parser 已覆盖现有写作需求，刻意保持依赖精简。
- **内容用 JS 对象数组而非 .md 文件**：双语字段（`title.zh / .en`）天然适合对象结构，且无需配置 MD loader。
- **暗色为默认主题**：与博客整体冷峻基调一致。

## 待办

- 评论 Worker 真实部署：完成 Cloudflare 非交互认证，创建或确认 `blog-comments` D1，把真实 ID 写入已忽略的 `wrangler.local.jsonc`，配置 Worker secrets，并填写 GitHub Actions 的评论 API / Turnstile 公开变量。
