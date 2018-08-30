import React, { Component } from 'react';
import { asyncConnect } from 'redux-connect';
import loadable from 'loadable-components';

import {
  pageDataLoadSuccessAction,
  pageDataLoadFailureAction,
  openLightboxAction,
  closeLightboxAction,
} from '../../app-actions';

import { apiRequest } from '../../util/api-request';

const Page = loadable(() =>
  import(/* webpackChunkName: "home-page" */'./component')
)

const mapStateToProps = state => ({
  pageData : state.appReducer.pageData,
})

const mapDispatchToProps = dispatch => ({
  openLightbox  : config => dispatch(openLightboxAction(config)),
  closeLightbox : ()     => dispatch(closeLightboxAction()),
})

@asyncConnect([{
  promise: ({ params, helpers, store: { dispatch }, data }) =>
    apiRequest('page', {}, data)
      .then(({ data: { pageData } }) => dispatch(pageDataLoadSuccessAction(pageData)))
}], mapStateToProps, mapDispatchToProps)
export default class HomePage extends React.Component {
  render() {
    return <Page {...this.props} />
  }
}
