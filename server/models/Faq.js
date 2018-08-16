import keystone from 'keystone';
const Types = keystone.Field.Types;

const Faq = new keystone.List('Faq', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true, //.sort({'sortOrder': 1})
});

Faq.add({
  name: { type: String, required: true },
  question: { type: String, required: false },
  answer: { type: Types.Html, wysiwyg: true },
});

Faq.defaultColumns = 'name, question, answer';
Faq.register();
