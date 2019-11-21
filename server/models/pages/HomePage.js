import { Text } from '@keystonejs/fields';

export const HomePage = keystone => {
  keystone.createList('HomePage', {
    schemaDoc: '',
    fields: {
      title : { type: Text, schemaDoc: '' },
      meta  : { type: Text, schemaDoc: '' },
    },
  });
}
