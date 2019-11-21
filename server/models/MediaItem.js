import { Text } from '@keystonejs/fields';

export const MediaItem = keystone => {
  keystone.createList('MediaItem', {
    schemaDoc: 'A collection of media to use on the site',
    fields: {
      name        : { type: Text, schemaDoc: 'Media Item Name' },
      description : { type: Text, schemaDoc: 'Description of what item is' },
    },
  });
}
