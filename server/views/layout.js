'use strict';
export default function renderLayout(app, initialState, pageScripts) {
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
  <script src="/vendor.js"></script>
  <script src="/client.js"></script>
  ${pageScripts.getScriptTag()}
</body>
</html>
  `;
}
