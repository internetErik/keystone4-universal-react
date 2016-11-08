'use strict';
import fetch from 'isomorphic-fetch';
import { isServer } from '../../util/environmentDetection';

export function getPosts(data) {
  return (isServer)
  ? Promise.resolve({ data })
  : fetch(`/api/blog`)
    .then(r => r.json());
}
