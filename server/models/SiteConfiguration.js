import { Text, Float, Checkbox } from '@keystonejs/fields';
import { loadSiteConfiguration } from '../cache/site-configuration';

export const SiteConfiguration = keystone => {
  keystone.createList('SiteConfiguration', {
    schemaDoc: 'A collection of frequently asked questions',
    fields: {
      title             : { type: Text,     schemaDoc: 'The FAQ' },
      passwordProtected : { type: Checkbox, schemaDoc: 'If on, site is password protected' },
      searchFuzziness   : { type: Float,    schemaDoc: 'How fuzzy search is' },
    },
  });
}

// SiteConfiguration.schema.post('save', loadSiteConfiguration);

