import { loadSiteConfiguration } from './site-configuration';
import { loadSiteSearch } from './site-search';

export const initialCacheLoad = () => new Promise((resolve, reject) => {

  console.log(new Date(), '**** Loading cache ****');

  const promises = [
    loadSiteSearch(),
  ];

  loadSiteConfiguration()
  .then(() => {
    Promise.all(promises)
    .then(() => {
      console.log(new Date(), '**** Finished Loading cache ****');
      resolve()
    })
    .catch(reject);
  })
})
