import { handleSSR } from './routers/ssr.js';
import { handleAPI } from './routers/api.js';
import { handlePages } from './routers/pages.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === '/ssr' && request.method === 'GET') {
      return handleSSR();
    }

    if (pathname === '/api' && request.method === 'POST') {
      return handleAPI(request);
    }

    // Only render pages for /, /en, /zh-cn
    if ((pathname === '/' || pathname === '/en' || pathname === '/zh-cn') && request.method === 'GET') {
      return handlePages(request);
    }

    // fallback: 404
    return new Response('Not found', { status: 404 });
  }
}

