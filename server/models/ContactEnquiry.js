import keystone from 'keystone';
const Types = keystone.Field.Types;

const ContactEnquiry = new keystone.List('ContactEnquiry', {
  map: { name: 'subject' },
  autokey: { path: 'slug', from: 'subject', unique: true },
  nocreate: (process.env.NODE_ENV !== 'dev'),
  noedit: true,
});

ContactEnquiry.add({
  subject : { type: String },
  message : { type: Types.Textarea },
  time    : { type: String  },
});

ContactEnquiry.defaultColumns = 'time, subject';
ContactEnquiry.register();
