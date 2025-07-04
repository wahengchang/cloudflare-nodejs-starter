const BASE_URL = 'http://localhost:8787';

async function runE2ETests() {
  let passed = 0, failed = 0;

  // GET /ssr
  try {
    const res = await fetch(`${BASE_URL}/ssr`);
    const text = await res.text();
    if (res.status === 200 && text.includes('<h1>Hello from SSR!</h1>')) {
      console.log('✓ GET /ssr returns HTML');
      passed++;
    } else {
      throw new Error('Unexpected /ssr response');
    }
  } catch (err) {
    console.error('✗ GET /ssr returns HTML', err);
    failed++;
  }

  // POST /api echoes JSON
  try {
    const res = await fetch(`${BASE_URL}/api`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ foo: 'bar' }),
    });
    const json = await res.json();
    if (res.status === 200 && json.received?.foo === 'bar' && json.timestamp) {
      console.log('✓ POST /api echoes JSON');
      passed++;
    } else {
      throw new Error('Unexpected /api echo response');
    }
  } catch (err) {
    console.error('✗ POST /api echoes JSON', err);
    failed++;
  }

  // GET /assets/js/vendor/sample.js returns JS file
  try {
    const res = await fetch(`${BASE_URL}/js/vendor/sample.js`);
    const text = await res.text();
    if (res.status === 200 && text.includes('Loaded vendor JS')) {
      console.log('✓ GET /assets/js/vendor/sample.js returns JS file');
      passed++;
    } else {
      throw new Error('Unexpected /assets/js/vendor/sample.js response');
    }
  } catch (err) {
    console.error('✗ GET /assets/js/vendor/sample.js returns JS file', err);
    failed++;
  }

  // POST /api returns 400 on invalid JSON
  try {
    const res = await fetch(`${BASE_URL}/api`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{ invalid json',
    });
    const json = await res.json();
    if (res.status === 400 && json.error === 'Invalid JSON') {
      console.log('✓ POST /api returns 400 on invalid JSON');
      passed++;
    } else {
      throw new Error('Unexpected /api error response');
    }
  } catch (err) {
    console.error('✗ POST /api returns 400 on invalid JSON', err);
    failed++;
  }

  // GET /notfound returns 404
  try {
    const res = await fetch(`${BASE_URL}/notfound`);
    if (res.status === 404) {
      console.log('✓ GET /notfound returns 404');
      passed++;
    } else {
      throw new Error('Unexpected /notfound response');
    }
  } catch (err) {
    console.error('✗ GET /notfound returns 404', err);
    failed++;
  }

  console.log(`\nE2E Tests: ${passed} passed, ${failed} failed.`);
  process.exit(failed ? 1 : 0);
}

runE2ETests();
