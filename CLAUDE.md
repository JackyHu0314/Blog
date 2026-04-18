# CLAUDE.md

给 Claude / 其它 AI agent 看的项目入门说明。人类读者请看 `README.md`。

> **给所有操作此仓库的 agent（包括未来的我自己）——以下是硬性责任：**
>
> **1. 主动维护两份文档，不要等用户提醒**
> - **`CLAUDE.md`（本文件）**：当目录结构、技术栈、约定、依赖、内容写作方式发生变化时，**立即更新对应章节**。这是后续 agent 的入口，过时即误导。
> - **`PROGRESS.md`**：完成有意义的迭代后（新页面 / 新文章 / 新组件 / 依赖变更 / 设计大改 / 删文件等），**立即追加时间线条目**，写清做了什么、为什么、改了哪些文件。日期用绝对日期（YYYY-MM-DD）。
> - 不要在 PROGRESS.md 里留 `- [ ]` 空 TODO 让用户填——待办由你根据对话总结。
>
> **2. 根据用户给出的信息及时更新两份文档**
> 当用户在对话中告诉你新的事实（约定变化、技术决策、个人偏好、新规则、待办、踩坑等），不要只在当前对话里点头答应——**立即把它落到 `CLAUDE.md`（约定/规则类）或 `PROGRESS.md`（进展/决策类）里**，让下次会话能继续生效。
>
> **3. 保护用户的个人信息，不要上传到 GitHub**
> - 凡是包含用户个人资料、内部素材、未公开草稿、个人笔记的文件/目录，**必须确保被 `.gitignore` 拦住**，不要纳入任何 commit。
> - 已知需要忽略的路径：`Blog依赖/`（用户的内部素材目录，含个人信息与未公开草稿）。
> - 看到新的疑似个人内容（口令、token、私人照片、聊天截图、未公开文档等）时，**先停下来确认**，不要默认添加进 commit。
> - `public/` 下的二维码和头像是用户**主动放出**用于公开展示的，可以上传。其他位置的二维码/身份信息**默认视为敏感**。

## 项目概述

Jacky 的个人博客。Vite + React 19 + Tailwind CSS v4 + React Router v7。中英双语，亮/暗双主题（默认暗色 cosmic-dark，亮色 anime-light）。纯静态，构建后部署 `dist/` 即可。

## 常用命令

```
npm install
npm run dev       # 本地开发 (Vite)
npm run build     # 生产构建到 dist/
npm run preview   # 预览构建产物
npm run lint      # ESLint
```

## 目录结构

- `src/pages/` — 路由级页面：`Landing` `Journal` `JournalDetail` `About` `Projects` `Research`
- `src/components/` — 复用组件（卡片、导航、主题/语言切换、热力图、TOC、评论、签名、搜索框等）
- `src/layouts/MainLayout.jsx` — 全局布局
- `src/context/` — `LanguageContext.jsx`（zh/en）、`ThemeContext.jsx`（dark/light，默认 dark）
- `src/i18n/dictionary.js` — 所有 UI 文案的 zh/en 字典 + `pick()` 工具函数
- `src/data/` — 内容数据源：`journals.js`（随记）、`projects.js`、`research.js`
- `public/` — 静态资源（头像、二维码、封面图、favicon）

## 内容是怎么"写"的

- 随记 / 项目 / 科研都是 **JS 对象数组**，不是独立的 .md 文件
- 每条至少包含：`id`、`title.{zh,en}`、`excerpt.{zh,en}`、`body.{zh,en}`、`category`、`date`、`cover`
- 正文支持极简 markdown：`## / ### / ####` 标题、`> ` 引用、`- ` 列表、`**粗体**`
- 解析器在 `src/pages/JournalDetail.jsx` 顶部的 `renderBody()`（自定义，无 `react-markdown` 依赖）
- **新增一篇随记 = 在 `src/data/journals.js` 数组里加一个对象**

## 主题与设计基调

- `ThemeContext` 通过给 `<html>` 加 `.dark` 类切换主题，偏好存 `localStorage` 的 `theme-preference`
- 设计语言：**冷峻黑白 + 半透明渐变爆发**；避免廉价艳丽感，背景用低饱和度灰
- 任何新组件、新配色都需符合这一基调

## 约定

- **双语强制**：任何新增 UI 文案 → `dictionary.js` 同时加 zh + en；任何新增内容（journals/projects/research）→ `title/excerpt/body` 都要 zh + en
- **暗色为默认**，新组件要在两套主题下都好看
- **依赖谨慎引入**：当前刻意没装 `react-markdown` / MDX，自定义 parser 已够用；新增依赖前先评估必要性

## 参考资源

- GitHub: JackyHu0314
- 进度记录见 `PROGRESS.md`（由 Claude 主动维护，每次有意义的迭代后更新）
- 二维码、头像在 `public/`（`avatar.jpg` / `wechat-qr.jpg` / `qq-qr.jpg`）
