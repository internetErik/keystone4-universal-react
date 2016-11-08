'use strict';
import { getPost, getPosts } from './posts';

/**
 * The function takes a url, and determines what functions will be required
 * for loading the required data out of mongo (from CMS data).
 *
 * Configuration is necessary if you add a new route, or need new data from mongo
 *
 * This could be abstracted higher, but right now it seems to be a good level of
 * abstraction for dealing with the project.
 *
 * @param  {string} url  the current route path we are working on
 * @return {Promise}     A promise that will resolve with the data put together
 * from the required functions.
 */
export default function populateData(url) {
  let data = {};
  let [arg1, arg2, arg3, arg4] = url.split('/').splice(1);
  return new Promise((resolve, reject) => {
    const promises = [];
    if(arg1 === 'post') {
      promises.push(getPosts(data));
      if(arg2)
        promises.push(getPost(arg2, data));
    }

    Promise.all(promises)
      .then(() => resolve(data));
  });
}
