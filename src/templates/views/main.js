// Main templates for the website

export const mainTemplate = `
<!DOCTYPE html>
<html lang="{{lang}}">
<head>
  <meta charset="UTF-8">
  <title>{{title}}</title>
</head>
<body>
  {{> header}}
  <nav class="language-nav">
    {{#languages}}
      <a href="{{url}}">{{label}}</a>{{^last}} | {{/last}}
    {{/languages}}
    | <a href="/ssr">SSR</a>
  </nav>
  <main>
    <p>{{helloWorld}}</p> 
    <form id="apiForm">
      <input type="text" id="apiInput" name="data" placeholder="Enter something" required />
      <button type="submit">Send to API</button>
    </form>
    <div id="apiResponse"></div>
  </main>
  {{> footer}}
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('apiForm');
      const input = document.getElementById('apiInput');
      const responseDiv = document.getElementById('apiResponse');
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        responseDiv.textContent = 'Loading...';
        try {
          const res = await fetch('/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: input.value })
          });
          const result = await res.json().catch(() => res.text());
          responseDiv.textContent = typeof result === 'object' ? JSON.stringify(result) : result;
        } catch (err) {
          responseDiv.textContent = 'Error: ' + err;
        }
      });
    });
  </script>
</body>
</html>
`;

export default mainTemplate;
