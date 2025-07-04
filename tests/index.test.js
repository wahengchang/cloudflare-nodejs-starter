import worker from '../src/index.js';

function makeRequest(path, options = {}) {
  return new Request(`http://localhost:8787${path}`, {
    method: options.method || 'GET',
    headers: options.headers || {},
    body: options.body || undefined,
  });
}

async function runUnitTests() {
  let passed = 0, failed = 0;

  // /ssr GET
  try {
    const req = makeRequest('/ssr');
    const res = await worker.fetch(req);
    const text = await res.text();
    if (res.status === 200 && text.includes('<h1>Hello from SSR!</h1>')) {
      console.log('✓ /ssr GET returns HTML');
      passed++;
    } else {
      throw new Error('Unexpected /ssr response');
    }
  } catch (err) {
    console.error('✗ /ssr GET returns HTML', err);
    failed++;
  }

  // /api POST (valid JSON)
  try {
    const req = makeRequest('/api', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ foo: 'bar' }),
    });
    const res = await worker.fetch(req);
    const json = await res.json();
    if (res.status === 200 && json.received?.foo === 'bar' && json.timestamp) {
      console.log('✓ /api POST echoes JSON');
      passed++;
    } else {
      throw new Error('Unexpected /api echo response');
    }
  } catch (err) {
    console.error('✗ /api POST echoes JSON', err);
    failed++;
  }

  // /api POST (invalid JSON)
  try {
    const req = makeRequest('/api', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{ invalid json',
    });
    const res = await worker.fetch(req);
    const json = await res.json();
    if (res.status === 400 && json.error === 'Invalid JSON') {
      console.log('✓ /api POST returns 400 on invalid JSON');
      passed++;
    } else {
      throw new Error('Unexpected /api error response');
    }
  } catch (err) {
    console.error('✗ /api POST returns 400 on invalid JSON', err);
    failed++;
  }

  // /notfound GET
  try {
    const req = makeRequest('/notfound');
    const res = await worker.fetch(req);
    if (res.status === 404) {
      console.log('✓ /notfound GET returns 404');
      passed++;
    } else {
      throw new Error('Unexpected /notfound response');
    }
  } catch (err) {
    console.error('✗ /notfound GET returns 404', err);
    failed++;
  }

  console.log(`\nUnit Tests: ${passed} passed, ${failed} failed.`);
  process.exit(failed ? 1 : 0);
}

runUnitTests();

// End of plain Node.js test script
