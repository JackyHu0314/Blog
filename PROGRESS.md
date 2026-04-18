# 项目进程

由 Claude 主动维护。记录博客开发过程中的关键迭代、决策与背景。

## 版本

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
- `CLAUDE.md`：给后续 AI agent 看的项目导航与硬性责任清单（主动维护两份文档、按用户输入及时更新、保护个人信息不上传 GitHub）。
- `PROGRESS.md`：项目进度时间线，由 Claude 主动维护。

**变更**
- `.gitignore`：新增 `Blog依赖/`，确保用户的内部素材目录（含个人信息与未公开草稿）不被上传 GitHub。
- `package.json` / `package-lock.json`：版本号 `0.0.0` → `0.0.1`。

**说明**：v0.0.1 是**文档与协作流程**的版本，未触及任何运行时源码（`src/`、`public/`、构建配置均未变），博客功能与 v0.0.0 完全一致。

## 时间线

### 2026-04-18

- 新建 `CLAUDE.md`（仓库根目录），作为给未来 AI agent 看的项目导航与约定文档。包含技术栈、目录结构、内容写作方式（journals.js 对象数组）、双语/双主题硬约定、自定义 markdown parser 位置等。这样换会话/换 agent 时不必再从头探索代码。
- 短暂存在过的空模板版 PROGRESS.md 已删除，改为本版本：由 Claude 自己写实际进度，而不是留空 checkbox 让用户填。
- 在 `CLAUDE.md` 顶部加了一段醒目提示，明确要求所有操作此仓库的 agent（包括未来的我自己）主动维护 `CLAUDE.md` 和 `PROGRESS.md` 两份文档，不留空 TODO、不等用户提醒。同步更新了 auto-memory 里的对应 feedback。
- **保护个人信息**：将 `Blog依赖/`（用户内部素材目录，含个人信息与未公开草稿）加入 `.gitignore`。该目录尚未被 git 跟踪，所以仅 .gitignore 即可，无需 `git rm --cached`。
- 在 `CLAUDE.md` 顶部的 agent 规则块中追加两条硬性责任：(2) 用户在对话里给出的新约定/规则要立即落到 CLAUDE.md 或 PROGRESS.md，不要只在当前会话点头；(3) 保护个人信息，凡疑似私人内容必须先 gitignore，不默认 commit。
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

（暂无明确待办；下次用户提需求时在此追加）
