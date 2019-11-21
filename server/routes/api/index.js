import { siteSearchController } from './actions/site-search';

import { reloadAllCacheController } from './admin-commands/reload-all-cache';

import { loginController } from './authorization/login';
import { logoutController } from './authorization/logout';

import { contactController } from './forms/contact';

import { pageDataController } from './page/page-data';

export const actionControllers = {
  siteSearchController,
};

export const adminCommandControllers = {
  reloadAllCacheController,
};

export const authorizationControllers = {
  loginController,
  logoutController,
};

export const formControllers = {
  contactController,
};

export const pageControllers = {
  pageDataController,
};

export const apiControllers = {
  actionControllers,
  adminCommandControllers,
  authorizationControllers,
  formControllers,
  pageControllers,
}