import fetch from 'isomorphic-fetch';
import { isServer } from '../../util/environmentDetection';

export const getPosts = data => (isServer)
  ? Promise.resolve({ data })
  : fetch(`/api/blog`)
    .then(r => r.json())
