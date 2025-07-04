# Cloudflare Worker SSR/API Starter

This project demonstrates a minimal Cloudflare Worker with SSR and API endpoints.

## Endpoints
- `/ssr` (GET): Renders HTML using a template string.
- `/api` (POST): Accepts JSON and responds with JSON.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start local dev server:
   ```bash
   npm run dev
   ```
3. Visit [http://localhost:8787/ssr](http://localhost:8787/ssr) or POST to `/api`.

## Deploying

Configure `wrangler.toml` for Cloudflare deployment.

---

## Glossary
- **Worker**: Cloudflare function that runs on their edge infra
- **Miniflare**: Local Workers runtime for dev/testing
- **Wrangler**: Cloudflare’s CLI/deployment tool
