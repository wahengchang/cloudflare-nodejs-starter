import { handleSSR, handleAPI } from './handlers.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;
  
    // Serve static assets for all non-API/non-SSR requests
    if (!pathname.startsWith('/ssr') && !pathname.startsWith('/api')) {
      return env.ASSETS.fetch(request);
    }
  
    if (pathname === '/ssr' && request.method === 'GET') {
      return handleSSR();
    }
  
    if (pathname === '/api' && request.method === 'POST') {
      return handleAPI(request);
    }
  
    // fallback: 404
    return new Response('Not found', { status: 404 });
  }
}
