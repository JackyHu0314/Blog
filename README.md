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
- 博客活跃度热力图
- 站点统计（在线天数、总字数、文章数、最后更新）
- 自建评论区：Cloudflare Worker + D1 + Turnstile

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

## 评论区后端

评论 API 放在 `workers/comments/`，使用 Cloudflare Worker + D1。

第一次配置：

```bash
npx wrangler login
cd workers/comments
npx wrangler d1 create blog-comments
```

把命令返回的 `database_id` 填到 `workers/comments/wrangler.jsonc`。

创建 Turnstile 后，把密钥写入 Worker secrets：

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put IP_HASH_SALT
npx wrangler secret put ADMIN_TOKEN
```

初始化远端数据库并部署：

```bash
npx wrangler d1 migrations apply blog-comments --remote
npx wrangler deploy
```

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
