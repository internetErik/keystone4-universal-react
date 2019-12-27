// page data
// import { getPageData } from './page-data';

// import { getFaqsData } from './faq';

// cache
import { siteConfigurationCache } from '../cache/site-configuration';

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
export default function populateData(pagePath, args, req, res) {
  const data = {};
  let [partOne] = req.path.split('/').splice(1);
  const isSSR = partOne !== 'api';

  return new Promise((resolve, reject) => {
    const promises = handleMainPages(data, pagePath, args, req, res, isSSR);

    Promise.all(promises)
      .then(() => {
        if(data.redirect)
          res.redirect(302, data.redirect);
        resolve(data);
      });
  });
}

const handleMainPages = (/*ref*/data, pagePath, args, req, res, isSSR) => {
  const promises = [];

  // handle home page, which doesn't have a route
  if(pagePath === '/' || pagePath === '')
    pagePath = 'home-page';

  // ********************
  // these are all routes from the react-router configuration!
  // ********************
  // switch(pagePath) {
  //   case 'home-page':
  //     promises.push(getPageData(data, 'HomePage'));
  //     break;
  //   case 'faqs':
  //     promises.push(getPageData(data, 'FaqPage'), getFaqsData(data));
  //     break;
  //   case 'contact':
  //     promises.push(getPageData(data, 'ContactPage'));
  //     break;
  //   default:
  //     break;
  // }

  return promises;
}
