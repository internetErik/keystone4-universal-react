import { Text, Checkbox, Password } from '@keystonejs/fields';
import { userIsAdminOrOwner, userIsAdmin } from './util/access-control';

export const User = keystone => {
  keystone.createList('User', {
    fields: {
      name: { type: Text },
      email : {
        type : Text,
        isUnique : true,
      },
      isAdmin : { type : Checkbox },
      password : {
        type : Password,
      },
    },
    access: {
      read   : userIsAdminOrOwner,
      update : userIsAdminOrOwner,
      create : userIsAdmin,
      delete : userIsAdmin,
    },
  });
}

