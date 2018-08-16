# How to Wire Pages Up to the Back-End

## Simple page (only page data)

### In `both` folder

#### Adding a Page

Pages should be added as react components in the `both/pages/` folder.

A directory should be created for the page (`both/pages/<PageName>Page`).

**Pro tip**: You can often copy a page folder that already exists and start renaming things.


#### Files Required in a page folder

* `component.js` the component
#### `component.js`

The page component and the folder should both end in 'Page', and match each other.

This file should begin by including:

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

#### Update Routing

if this is actually a new page you'll need to add it to the client side routing. This is found in `both/routes.js`. Follow the example of other pages there.

## Complex page (data from other models)

### In `both` folder

#### Adding a Page

Pages should be added as react components in the `both/pages/` folder.

A directory should be created for the page (`both/pages/<PageName>Page`).

**Pro tip**: You can often copy a page folder that already exists and start renaming things.

#### Files used for component

* `index.js` - imports component (code splitting) and fetches async data
* `component.js` - the component
* If you need a reducer for the page follow normal redux patterns
  * `constants.js` redux action types
  * `actions.js` the action creators
  * `reducer.js` the redux reducer

#### `component.js`

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default class <PageName>Page extends React.Component {

  static propTypes = {
    pageData: PropTypes.object,
  };

  render() {
    const { pageData } = this.props;
    return pageData
    ? (
      <section className="<page-name>-page">
        <div>
          Hello World
        </div>
      </section>
    )
    : <div></div>;
  }
}

```

#### `index.js`

This file should begin by including:

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

#### Update `both/reducers.js`

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
  reduxAsyncConnect,//last
});
```

## Common steps for both Simple and Complex

#### Update Routing

if this is actually a new page you'll need to add it to the client side routing. This is found in `both/routes.js`. Follow the example of other pages there.

## In `server` folder

On the server you'll need to create a few files and update some other files.

#### Create a Model

Create a file `server/models/pages/<PageName>Page.js`.

This file should begin by including:

```javascript
'use strict';
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

#### Update `server/updates/0.0.1-admin.js` file

This is updated so that new people to the project get a database populated with everything relevant. Follow the example of other pages in this file.

#### Update `server/index.js`

In `server/index.js` you'll see a section that looks something like this:

```javascript
keystone.set('nav', {
  'page data': ['home-pages', '<page-name>-pages'],
});
```

Under the page data section, add your page following the other examples. (**Note:** your page must be pluralized in this list.)

#### Manually Create the Page

* Log in to keystone
* Go to the section of the model you just created
* Create a page, and give it a title (Ideally usually whatever the page is named).
* Save

#### Update `server/data/index.js` to Allow Server Side Rendering to load Data

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

Update it as illustrated above.



