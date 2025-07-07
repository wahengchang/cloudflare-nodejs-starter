// Handler for SSR endpoint
import { htmlTemplate } from './template.js';

export async function handleSSR() {
  const content = `<h1>Hello from SSR!</h1><p>Time: ${new Date().toLocaleString()}</p>`;
  const html = htmlTemplate(content);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}

// Handler for API endpoint
export async function handleAPI(request) {
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
