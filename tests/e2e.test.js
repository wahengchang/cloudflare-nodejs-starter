import { describe, it, expect } from 'vitest';

const BASE_URL = 'http://localhost:8787';

describe('E2E: Cloudflare Worker', () => {
  it('GET /ssr returns HTML', async () => {
    const res = await fetch(`${BASE_URL}/ssr`);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('<h1>Hello from SSR!</h1>');
  });

  it('POST /api echoes JSON', async () => {
    const res = await fetch(`${BASE_URL}/api`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ foo: 'bar' }),
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('received.foo', 'bar');
    expect(json).toHaveProperty('timestamp');
  });

  it('POST /api returns 400 on invalid JSON', async () => {
    const res = await fetch(`${BASE_URL}/api`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{ invalid json',
    });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toHaveProperty('error', 'Invalid JSON');
  });

  it('GET /notfound returns 404', async () => {
    const res = await fetch(`${BASE_URL}/notfound`);
    expect(res.status).toBe(404);
  });
});
