import React, { Component } from 'react'
import { asyncConnect } from 'redux-connect'
import loadable from 'loadable-components'

import {
  pageDataLoadSuccessAction,
  pageDataLoadFailureAction,
} from '../../app-actions';

import { apiRequest } from '../../util/api-request';

const Page = loadable(() =>
  import(/* webpackChunkName: "home-page" */'./component')
)

const mapStateToProps = state => ({
  pageData : state.appReducer.pageData,
})

@asyncConnect([{
  promise: ({ params, helpers, store: { dispatch }, data }) =>
    apiRequest('page', {}, data)
      .then(({ data: { pageData } }) => dispatch(pageDataLoadSuccessAction(pageData)))
}], mapStateToProps)
export default class HomePage extends React.Component {
  render() {
    return <Page {...this.props} />
  }
}
