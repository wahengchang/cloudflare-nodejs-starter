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
