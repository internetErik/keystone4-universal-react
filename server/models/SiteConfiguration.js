import keystone from 'keystone';
const Types = keystone.Field.Types;
import { loadSiteConfiguration } from '../cache/site-configuration';

const SiteConfiguration = new keystone.List('SiteConfiguration', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  nocreate: (process.env.NODE_ENV !== 'dev'),
  nodelete: true
});

SiteConfiguration.add({
  title: { type: String, required: true },
  passwordProtected: { type: Types.Boolean, label: 'Password Protected' },
},
'Site Search',
{
  searchFuzziness : { type: Number, note: 'Between 1 and 0' },
});

SiteConfiguration.schema.post('save', loadSiteConfiguration);

SiteConfiguration.defaultColumns = 'title';
SiteConfiguration.register();
