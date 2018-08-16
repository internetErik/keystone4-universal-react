import keystone from 'keystone';
const Types = keystone.Field.Types;

const FaqPage = new keystone.List('FaqPage', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  nocreate: !(process.env.NODE_ENV === 'dev' || process.env.CAN_CREATE_PAGES === 'true'),
  nodelete: true
});

FaqPage.add({
  title: { type: String, required: true },
});

FaqPage.defaultColumns = 'title';
FaqPage.register();
