# Jacky's Blog

个人博客，基于 Vite + React 19 + Tailwind CSS v4 构建。

## 技术栈

- React 19
- Vite 8
- Tailwind CSS v4
- React Router v7

## 功能

- 中英双语切换
- 亮色 / 暗色主题（默认暗色）
- 随记、项目、科研、关于页面
- 音乐空间：听歌短记、4 份 Apple Music 真实歌单索引与 B 站音乐视频入口
- 可用的站内文章搜索
- 小红书 `JackyUnique`、GitHub 与 Email 社交入口
- 站点统计（在线天数、总字数、文章数、最后更新）
- 自建评论区：Cloudflare Worker + D1 + Turnstile（默认审核、不收集邮箱）

## 本地开发

```bash
npm install
npm run dev
```

复制环境变量示例：

```bash
cp .env.example .env.local
```

评论区需要配置：

```text
VITE_COMMENTS_API_BASE_URL=评论 Worker 地址
VITE_TURNSTILE_SITE_KEY=Turnstile site key
```

GitHub Pages 部署时，在仓库的 Actions variables 中创建同名的
`VITE_COMMENTS_API_BASE_URL` 和 `VITE_TURNSTILE_SITE_KEY`。它们会在构建阶段注入前端。

## 评论区后端

评论 API 放在 `workers/comments/`，使用 Cloudflare Worker + D1。

第一次配置：

```bash
npx wrangler login
npx wrangler d1 create blog-comments
cp workers/comments/wrangler.jsonc workers/comments/wrangler.local.jsonc
```

PowerShell 可用 `Copy-Item workers/comments/wrangler.jsonc workers/comments/wrangler.local.jsonc`。
把命令返回的 `database_id` 填到被 Git 忽略的 `workers/comments/wrangler.local.jsonc`；
仓库内的 `wrangler.jsonc` 只作为无凭据模板。

创建 Turnstile 后，把密钥写入 Worker secrets：

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY --config workers/comments/wrangler.local.jsonc
npx wrangler secret put IP_HASH_SALT --config workers/comments/wrangler.local.jsonc
npx wrangler secret put ADMIN_TOKEN --config workers/comments/wrangler.local.jsonc
```

Worker 默认只接受 `www.jackyhu.top`、`jackyhu.top`、`localhost` 和 `127.0.0.1`
产生的 Turnstile token，并要求 widget action 为 `comment`。如需增加域名，请修改
`TURNSTILE_ALLOWED_HOSTNAMES`；不要把 Turnstile secret、`IP_HASH_SALT` 或
`ADMIN_TOKEN` 写入版本控制。

初始化远端数据库并部署：

```bash
npm run comments:migrate:remote
npm run comments:deploy
```

部署后可访问 `https://<worker>/health`。只有 D1 查询成功，并且 Turnstile、IP 哈希盐与
审核所需的管理员令牌均已正确配置时，该接口才返回 `200`。

审核评论：

```bash
curl -H "Authorization: Bearer <ADMIN_TOKEN>" "https://<worker>/admin/comments?status=pending"
curl -X POST -H "Authorization: Bearer <ADMIN_TOKEN>" "https://<worker>/admin/comments/<comment_id>/approve"
curl -X POST -H "Authorization: Bearer <ADMIN_TOKEN>" "https://<worker>/admin/comments/<comment_id>/reject"
```

## 部署

```bash
npm run build
```

将 `dist/` 目录部署到任意静态托管平台（Cloudflare Pages、Nginx 等）。
