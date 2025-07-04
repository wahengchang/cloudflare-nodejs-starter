export const htmlTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My SSR Page</title>
  <link rel="stylesheet" href="/css/theme/sample.css" />
</head>
<body>
  <div id="root">
    ${content}
  </div>
  <script src="/js/vendor/sample.js"></script>
</body>
</html>
`;
