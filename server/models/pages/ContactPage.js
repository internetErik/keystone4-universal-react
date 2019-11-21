import { Text } from '@keystonejs/fields';

export const ContactPage = keystone => {
  keystone.createList('ContactPage', {
    schemaDoc: '',
    fields: {
      title : { type: Text, schemaDoc: '' },
      meta  : { type: Text, schemaDoc: '' },
    },
  });
}
