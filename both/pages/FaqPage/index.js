import React, { Component } from 'react'
import { asyncConnect } from 'redux-connect'
import loadable from 'loadable-components'

import {
  pageDataLoadSuccessAction,
  pageDataLoadFailureAction,
} from '../../app-actions';
import { getFaqsAction } from './actions';

import { apiRequest } from '../../util/api-request';

const Page = loadable(() =>
  import(/* webpackChunkName: "faq-page" */'./component')
)

const mapStateToProps = state => ({
  pageData : state.appReducer.pageData,
  faqs     : state.faqPageReducer.faqs,
})

@asyncConnect([{
  promise: ({ params, helpers, store: { dispatch }, data }) =>
    apiRequest('page/faqs', {}, data)
      .then(({ data: { pageData, faqs } }) => {
        dispatch(pageDataLoadSuccessAction(pageData));
        dispatch(getFaqsAction(faqs));
      })
}], mapStateToProps)
export default class FaqPage extends React.Component {
  render() {
    return <Page {...this.props} />
  }
}
