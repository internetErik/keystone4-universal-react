import keystone from 'keystone';
const Types = keystone.Field.Types;

const ContactPage = new keystone.List('ContactPage', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  nocreate: !(process.env.NODE_ENV === 'dev' || process.env.CAN_CREATE_PAGES === 'true'),
  nodelete: true
});

ContactPage.add({
  title: { type: String, required: true },
  meta: { type: String },
});

ContactPage.defaultColumns = 'title';
ContactPage.register();
