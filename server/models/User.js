import { Text, Checkbox, Password } from '@keystonejs/fields';
import { userIsAdminOrOwner, userIsAdmin } from './util/access-control';

const isUnique   = true;
const isRequired = true;

export const User = keystone => {
  keystone.createList('User', {
    fields: {
      name     : { type : Text,     isRequired },
      email    : { type : Text,     isRequired, isUnique},
      password : { type : Password, isRequired },
      isAdmin  : { type : Checkbox },
    },
    access: {
      read   : userIsAdminOrOwner,
      update : userIsAdminOrOwner,
      create : userIsAdmin,
      delete : userIsAdmin,
      auth   : true,
    },
  });
}

