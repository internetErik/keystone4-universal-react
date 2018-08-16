import { isBrowser } from './environment-detection';

const env = isBrowser ? window.__ENV : process.env.NODE_ENV;
const baseUrl = isBrowser ? window.__CLOUDFRONT_BASE_URL : process.env.CLOUDFRONT_BASE_URL;

export const generateAssetUrl = (filename, path, asset) =>
  `${baseUrl}${asset ? 'assets' : env}${path ? `/${path}/` : ''}${filename}`
