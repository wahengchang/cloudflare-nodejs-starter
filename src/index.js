import { htmlTemplate } from './template.js';

// Main worker event listener
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Serve static assets for all non-API/non-SSR requests
    if (!pathname.startsWith('/ssr') && !pathname.startsWith('/api')) {
      return env.ASSETS.fetch(request);
    }

    if (pathname === '/ssr' && request.method === 'GET') {
      // Simple SSR endpoint
      const content = `<h1>Hello from SSR!</h1><p>Time: ${new Date().toLocaleString()}</p>`;
      const html = htmlTemplate(content);
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    if (pathname === '/api' && request.method === 'POST') {
      try {
        const body = await request.json();
        const result = {
          received: body,
          timestamp: new Date().toISOString()
        };
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // fallback: 404
    return new Response('Not found', { status: 404 });
  }
};
