'use strict';
import fetch from 'isomorphic-fetch';
import { isServer } from '../../util/environmentDetection';

export function getMessage() {
  return (isServer) 
  ? Promise.resolve({response: 'hello world'})
  : fetch('/api/post')
    .then(r => r.json());
}
