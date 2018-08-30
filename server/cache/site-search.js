import keystone from 'keystone';

export const siteSearchCache = {
  lastLoaded: new Date(),
  data: null,
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

export const loadSiteSearch = next => new Promise((resolve, reject) => {
  console.log("*** Initializing Site Search Cache ***");
  // overall site config
  siteSearchCache.lastLoaded = new Date();
  siteSearchCache.data = [];
  const promises = landingPagesToSearch.map(({ model, path }) => new Promise((resolve, reject) => {
    keystone.list(model).model.find()
    .exec((err, result) => {
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
    console.log("*** Finished Loading Site Search Cache ***");
    resolve(siteSearchCache);
  })
  .catch(() => reject())

  typeof(next) === 'function' && next();
})
