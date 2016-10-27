import fetch from 'isomorphic-fetch';

export function getMessage(dispatcher, success, failure) {
  if(true)
    return fetch('/api/post')
      .then(r => r.json())
      .then(r => dispatcher(success(r.response)));
  else
    return dispatcher(success('hello world')); //potentially delivered out of cache
}
