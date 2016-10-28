'use strict';
import keystone from 'keystone';
const User = keystone.list('User');

export default function(done) {
  new User.model({
    name: { first: 'admin', last: 'user' },
    email: 'user@keystonejs.com',
    password: 'admin',
    canAccessKeystone: true
  }).save(done);
}