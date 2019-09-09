import { getSiteConfigurationCache } from '../cache/site-configuration';

const CDN_URL = process.env.ROOT_ASSET_URL;
const NODE_ENV = process.env.NODE_ENV;
const HASH = process.env.WEBPACK_HASH;

/**
 * Creates a string representing the url a css file is downloaded from
 * @param  {String} scriptName the filename of the css
 * @return {String}            the url used for downloading the css
 */
const generateStyleHref = () => (
  NODE_ENV === 'staged'     ? `${CDN_URL}assets/staged/styles-${HASH}.css`
: NODE_ENV === 'production' ? `${CDN_URL}assets/styles-${HASH}.css`
: '/styles.css'
)

/**
 * Creates a string representing the url a javaScript file is downloaded from
 * @param  {String} scriptName the filename of the script
 * @return {String}            the url used for downloading the script
 */
const generateScriptSrc = scriptName => (
  NODE_ENV === 'staged'     ? `${CDN_URL}assets/staged/${scriptName}-${HASH}.min.js`
: NODE_ENV === 'production' ? `${CDN_URL}assets/${scriptName}-${HASH}.min.js`
: `/${scriptName}.js`
)

/**
 * This renders the page. It injects the body of the site rendered from react
 *
 * @param  {object} head         All the data for the head of the site
 * @param  {string} app          The rendered react application
 * @param  {object} initialState The initial state of the redux store
 * @param  {bool}   hasUser      True if there is a user logged in to keystone
 * @return {string}              A string that is returned through the http(s) response to the client
 */
const renderLayout = (head, app, initialState, hasUser) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
  ${ head.meta.toString() }
  ${ head.link.toString() }
  ${ head.title.toString() }
  <link rel="stylesheet" href="https://use.typekit.net/tpu5yos.css">
  <link rel="stylesheet" href="${ generateStyleHref() }" />
  <script>
    var isIE = (typeof Object.assign === 'undefined' || window.navigator.userAgent.indexOf("Edge") > -1);
    document.querySelector('html').classList.add(isIE ? 'not-ie' : 'is-ie');
  </script>
</head>
<body style="overflow-x: hidden;">
  <div id="app">${app}</div>
  <script>
  window.__INITIAL_STATE = ${ JSON.stringify(initialState) };
  window.__ENV = "${ NODE_ENV }";
  window.__ROOT_ASSET_URL = "${ CDN_URL }"
  </script>
  <script src="${ generateScriptSrc('vendor') }"></script>
  <script src="${ generateScriptSrc('login') }"></script>
</body>
</html>
`;

export default renderLayout;
