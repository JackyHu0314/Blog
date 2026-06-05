export const commentsConfig = {
  apiBaseUrl: (import.meta.env.VITE_COMMENTS_API_BASE_URL ?? '').replace(/\/$/, ''),
  turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '',
}
