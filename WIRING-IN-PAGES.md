# How to Wire Pages Up to the Back-End

This should provide a step by step guide for how to create a new page for a site and then provide data to it from a keystone model.

## In `both` folder

### Adding a Page

Pages should be added as react components in the `both/pages/` folder.

A directory should be created for the page (`both/pages/<PageName>Page`).

**Pro tip**: You can often copy a page folder that already exists and start renaming things.

### Files Required in a page folder

* `index.js` Load component, wire in to react-redux and perform code-splitting
* `component.js` the component

***Note***: This tutorial assumes that you will be code-splitting any new page that you add.

### Sample `index.js`

```javascript
import React, { Component } from 'react'
import { asyncConnect } from 'redux-connect'
import loadable from 'loadable-components'

import {
  pageDataLoadSuccessAction,
  pageDataLoadFailureAction,
} from '../../global-actions';

import { apiRequest } from '../../util/api-request';

const Page = loadable(() =>
  import(/* webpackChunkName: "<page-name>-page" */'./component')
)

const mapStateToProps = state => ({
  pageData : state.appReducer.pageData,
})

@asyncConnect([{
  promise: ({ params, helpers, store: { dispatch }, data }) =>
    apiRequest('page', {}, data)
      .then(({ data: { pageData } }) => dispatch(pageDataLoadSuccessAction(pageData)))
}], mapStateToProps)
export default class <PageName>Page extends React.Component {
  render() {
    return <Page {...this.props} />
  }
}

```

### Sample `component.js`

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';

import {
  pageDataLoadSuccessAction,
  pageDataLoadFailureAction,
} from '../../global-actions';

import { apiRequest } from '../../util/api-request';

const mapStateToProps = state => ({});

@asyncConnect([{
  promise: ({ params, helpers, store: { dispatch }, data }) =>
    apiRequest('page/<react-router route for this page>', {}, data)
      .then(({ data: { pageData } }) => dispatch(pageDataLoadSuccessAction(pageData)))
}], mapStateToProps)
export default class <PageName>Page extends React.Component {

  static propTypes = {
    pageData: PropTypes.object,
  };

  render() {
    const { pageData } = this.props;

    return (
      <main className="<page-name>-page">
        <Helmet
          title="<Page Name>"
        />
        { <pageName>PageData }
      </main>
    );
  }
}
```

### Additional Files used for new pages

* If the page performs actions that should be preserved between pages, then you should use redux
  * `constants.js` redux action types
  * `actions.js` the action creators
  * `reducer.js` the redux reducer
* If you want static content, and don't want to polute the `component.js` file with it, then import it from an external file
  * `content.js`

#### Update Combined Reducers (`both/reducers.js`) (Only `reducer.js` was Created)

```javascript
import { combineReducers } from 'redux';
import appReducer from './app-reducer';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import homePageReducer from '../pages/HomePage/reducer';
import <pageName>PageReducer from '../pages/<PageName>Page/reducer';

export default combineReducers({
  appReducer,
  homePageReducer,
  <pageName>PageReducer,
  reduxAsyncConnect,// must be last
});
```

### Update Client-Side Routing (`both/routes.js`)

You need to add new pages to the client side routing. This is found in `both/routes.js`. Follow the example of other pages there.

```javascript

const routes = [{
  component: App,
  routes: [
    {
      path     : '/',
      exact    : true,
      component: HomePage,
    },
    {
      path     : '/faqs',
      component: FaqPage,
    },
    {
      path     : '/contact',
      component: ContactPage,
    },
    // ** You'll add something like this **
    {
      path     : '/<react-router route for this page>',
      component: <PageName>Page,
    },
    {
      path     : '*',
      component: NotFoundPage,
    },
  ],
}];

```

## In `server` folder

On the server you'll need to create a few files and update some other files.

### Create a Model for your Page

Create a file `server/models/pages/<PageName>Page.js`.

This file should begin by including:

```javascript
import keystone from 'keystone';
const Types = keystone.Field.Types;

const <PageName>Page = new keystone.List('<PageName>Page', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
  nocreate: !(process.env.NODE_ENV === 'dev' || process.env.CAN_CREATE_PAGES === 'true'),
  nodelete: true,
});

<PageName>Page.add({
  title: { type: String, required: true },
  // put whatever other fields you need.
  // look at other models for examples
});

<PageName>Page.defaultColumns = 'title';
<PageName>Page.register();

```

### Update Database Seed (`server/updates/0.0.1-admin.js`) (Optional)

This file seeds the database on the first run of the site. Having all necessary information here and up to date helps deployments to go much smoother.

```javascript
exports.create = {
  User: [
    { 'name.first': 'Admin', 'name.last': 'User', 'email': 'user@keystonejs.com', 'password': 'admin', 'isAdmin': true },
  ],
  SiteConfiguration: [
    { title : 'Global Site Configuration' },
  ],
  HomePage: [
    { title: 'Home Page' },
  ],
  FaqPage: [
    { title: 'Faq Page' },
  ],
  ContactPage: [
    { title: 'Contact Page' },
  ],
  // ** You'll add something like this **
  <PageName>Page: [
    { title: '<Page Name> Page' },
  ],
  // end new page entry
};

```

### Update CMS Model Presentation (`server/index.js`) (Optional)

In `server/index.js` you'll see a section that looks something like this:

```javascript
keystone.set('nav', {
  'page data': [
    'home-pages',
    // ** You'll add something like this **
    '<page-name>-pages'
  ],
});
```

Under the page data section, add your page following the other examples. (**Note:** your page must be pluralized in this list.)

### Update Page Data Loading Routes (`server/data/index.js`) for Server-Side Rendering

In `server/data/index.js` you'll see a section that looks something like this:

```javascript
  switch(pagePath) {
    // ...
    case 'home-Page':
      promises.push(getPageData(data, 'HomePage'));
      break;
    // ** You'll add something like this **
    case '<route used in react-router config>':
      promises.push(getPageData(data, '<PageName>Page'));
      break;
    //...
  }
```

## Data Entry: Manually Create the Page Instance in Keystone

* Log in to keystone
* Go to the section of the model you just created
* Create a page, and give it a title (Ideally usually whatever the page is named).
* Save
