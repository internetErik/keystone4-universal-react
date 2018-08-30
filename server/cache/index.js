import { loadSiteConfiguration } from './site-configuration';
import { loadSiteSearch } from './site-search';

export const initialCacheLoad = () => {
  loadSiteConfiguration();
  loadSiteSearch();
};
