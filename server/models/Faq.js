import { Text } from '@keystonejs/fields';

export const Faq = keystone => {
  keystone.createList('Faq', {
    schemaDoc: 'A collection of frequently asked questions',
    fields: {
      question : { type: Text,    schemaDoc: 'The FAQ' },
      answer   : { type: Text, schemaDoc: 'The answer to the FAQ' },
    },
  });
}
