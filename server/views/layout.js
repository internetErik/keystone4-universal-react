'use strict';
export default function renderLayout(app, initialState) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello World</title>
</head>
<body>
  <div id="app">${app}</div>
  <script>window.__INITIAL_STATE = ${JSON.stringify(initialState)}</script>
  <script src="/bundle.js"></script>
</body>
</html>
  `;
}
