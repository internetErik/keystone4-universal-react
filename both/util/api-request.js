import fetch from 'isomorphic-fetch';
import { isServer } from './environment-detection';

export function apiRequest(apiPath, requestBody, data) {
  return (isServer)
  ? Promise.resolve({ data })
  : fetch(`/api/${apiPath}/`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(r => r.json());
}
