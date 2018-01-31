'use strict';

const renderLayout = (app, pageScripts, initialState, hasUser) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello World</title>
</head>
<body>
  <div id="app">${app}</div>
  <script>
    window.__INITIAL_STATE = ${JSON.stringify(initialState)}
    window.__ENV = "${ process.env.NODE_ENV }";
    window.__USER = ${ hasUser };
  </script>
  ${
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staged'
      ? `
        <script src="/vendor.min.js"></script>
        <script src="/client.min.js"></script>
      `
      : `
        <script src="/vendor.js"></script>
        <script src="/client.js"></script>
      `
  }
  ${ pageScripts }
  ${pageScripts}
</body>
</html>
`

export default renderLayout;
