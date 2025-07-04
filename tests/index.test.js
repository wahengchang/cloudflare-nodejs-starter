// @vitest-environment miniflare
import { describe, it, expect } from 'vitest';
import worker from '../src/index.js';

function makeRequest(path, options = {}) {
  return new Request(`http://localhost:8787${path}`, {
    method: options.method || 'GET',
    headers: options.headers || {},
    body: options.body || undefined,
  });
}

describe('Cloudflare Worker', () => {
  it('/ssr returns HTML', async () => {
    const req = makeRequest('/ssr');
    const res = await worker.fetch(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/html');
    const text = await res.text();
    expect(text).toContain('<h1>Hello from SSR!</h1>');
  });

  it('/api echoes JSON', async () => {
    const payload = { foo: 'bar' };
    const req = makeRequest('/api', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const res = await worker.fetch(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('application/json');
    const json = await res.json();
    expect(json).toHaveProperty('received.foo', 'bar');
    expect(json).toHaveProperty('timestamp');
  });

  it('/api returns 400 on invalid JSON', async () => {
    const req = makeRequest('/api', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{ invalid json',
    });
    const res = await worker.fetch(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toHaveProperty('error', 'Invalid JSON');
  });

  it('returns 404 for unknown route', async () => {
    const req = makeRequest('/notfound');
    const res = await worker.fetch(req);
    expect(res.status).toBe(404);
  });
});
