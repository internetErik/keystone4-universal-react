import keystone from 'keystone';

export const siteConfigurationCache = {
  lastLoaded: new Date(),
  data      : {},
};

export const loadSiteConfiguration = next => new Promise((resolve, reject) => {
  console.log('*** Loading site configuration cache ***');
  keystone.list('SiteConfiguration')
  .model
  .findOne()
  .populate('courseBrochure termsAndConditions')
  .exec((err, result) => {
    if(err) reject();
    if(result) {
      siteConfigurationCache.lastLoaded = new Date();
      siteConfigurationCache.data = result.toObject();
      console.log('*** Finished loading site configuration cache ***');
      resolve(siteConfigurationCache);
    }
  });

  typeof(next) === 'function' && next();
})
