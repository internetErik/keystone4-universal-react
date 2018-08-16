import keystone from 'keystone';

export const siteConfigurationCache = {
  lastLoaded: new Date(),
  data      : {},
};

export const loadSiteConfiguration = next => {
  console.log('*** Loading site configuration cache ***');
  keystone.list('SiteConfiguration')
  .model
  .findOne()
  .populate('courseBrochure termsAndConditions')
  .exec((err, result) => {
    if(result) {
      siteConfigurationCache.lastLoaded = new Date();
      siteConfigurationCache.data = result.toObject();
      console.log('*** Finished loading site configuration cache ***');
    }
  });

  typeof(next) === 'function' && next();
}
