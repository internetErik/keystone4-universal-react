import { Text, DateTime } from '@keystonejs/fields';
import { userIsAdminOrOwner, userIsAdmin } from './util/access-control';

export const ContactEnquiry = keystone => {
  keystone.createList('ContactEnquiry', {
    fields: {
      subject : { type: Text },
      message : { type: Text },
      time    : { type: DateTime },
    },
    access: {
      read   : userIsAdminOrOwner,
      update : userIsAdminOrOwner,
      create : userIsAdmin,
      delete : userIsAdmin,
    },
  });
}
