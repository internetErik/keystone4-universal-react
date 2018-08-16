import keystone from 'keystone';
const Types = keystone.Field.Types;
import { loadSiteConfiguration } from '../cache/siteConfiguration';

const SiteConfiguration = new keystone.List('SiteConfiguration', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  nocreate: (process.env.NODE_ENV !== 'dev'),
  nodelete: true
});

SiteConfiguration.add({
  title: { type: String, required: true },
  passwordProtected: { type: Types.Boolean, label: 'Password Protected' },
});

SiteConfiguration.schema.post('save', loadSiteConfiguration);

SiteConfiguration.defaultColumns = 'title';
SiteConfiguration.register();
