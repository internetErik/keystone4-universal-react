import keystone from 'keystone';
import Fuse from 'fuse.js';

import { siteConfigurationCache } from './site-configuration';

const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 1000,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "name",
    "meta",
    "type"
  ]
};

export const siteSearchCache = {
  lastLoaded : new Date(),
  data       : null,
  search     : null,
};

const landingPagesToSearch = [
  {
    model: 'HomePage',
    path: '/',
  },
  {
    model: 'FaqPage',
    path: '/faqs',
  },
  {
    model: 'ContactPage',
    path: '/contact',
  },
];

export const loadSiteSearch = next => new Promise((resolve, reject) => {
  console.log("*** Initializing Site Search Cache ***");

  fuseOptions.threshold = siteConfigurationCache.data.searchFuzziness || 0.6;

  siteSearchCache.lastLoaded = new Date();
  siteSearchCache.data = [];

  const promises = landingPagesToSearch.map(({ model, path }) => new Promise((resolve, reject) => {
    keystone.list(model).model.findOne()
    .exec((err, result) => {
      if(err) reject(err);
      if(result)
        siteSearchCache.data.push({
          name: result.title,
          meta: result.meta,
          path: path,
          type: 'landing-page',
        });
      resolve();
    })
  }))

  Promise.all(promises)
  .then(() => {
    // create lookup object
    const fuse = new Fuse(siteSearchCache.data, fuseOptions);

    // bind the search method for fuse to cache object
    siteSearchCache.search = fuse.search.bind(fuse);

    console.log("*** Finished Loading Site Search Cache ***");
    resolve(siteSearchCache);
  })
  .catch(err => reject(err))

  typeof(next) === 'function' && next();
})
