import { Text } from '@keystonejs/fields';

export const FaqPage = keystone => {
  keystone.createList('FaqPage', {
    schemaDoc: '',
    fields: {
      title : { type: Text, schemaDoc: '' },
      meta  : { type: Text, schemaDoc: '' },
    },
  });
}
