import fetch from 'isomorphic-fetch';
import { isServer } from '../../util/environmentDetection';

export const getMessage = () => (isServer)
  ? Promise.resolve({response: 'hello world'})
  : fetch('/api/post')
    .then(r => r.json());
