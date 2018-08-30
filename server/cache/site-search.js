import keystone from 'keystone';
import Fuse from 'fuse.js';

export const siteSearchCache = {
  lastLoaded: new Date(),
  data: [],
};

const landingPagesToSearch = [
  {
    model: 'HomePage',
    path: '/',
  },
  {
    model: 'FaqPage',
    path: '/faq',
  },
  {
    model: 'ContactPage',
    path: '/contact',
  },
];

export const loadSiteSearch = () => {
  console.log("*** Initializing Site Search Cache ***");
  // overall site config
  siteSearchCache.lastLoaded = new Date();
  const promises = landingPagesToSearch.map(page => new Promise((resolve, reject) => {
    keystone.list(page.model).model.find()
    .exec((err, results) => {
      if(result)
        siteSearchCache.data.push({
          name: result.title,
          meta: result.meta,
          path: page.path,
          type: 'landing-page',
        });
      resolve();
    })
  }))

  Promise.all(promises)
  .then(() => {
    searchCache.fuse = new Fuse(searchCache.data, fuseOptions);
  })
}
