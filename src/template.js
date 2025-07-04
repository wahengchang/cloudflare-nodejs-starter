export const htmlTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My SSR Page</title>
</head>
<body>
  <div id="root">
    ${content}
  </div>
</body>
</html>
`;
