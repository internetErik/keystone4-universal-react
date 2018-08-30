import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import InputText from '../../../../inputs/InputText';

const initialValues = {
  queryValue : '',
}

const initialDirty = {
  queryDirty : '',
}

export default class SiteSearch extends React.Component {

  constructor() {
    super();
    this.state = {
      values : {
        ...initialValues,
      }
    };
  }

  handleValueChanged = change => this.setState({ values : { ...this.state.values, ...change } }, this.validateForm)

  handleDirtyChanged = change => this.setState({ dirty : { ...this.state.dirty, ...change } })

  submitQuery = e => {
    e.preventDefault();
    const { queryValue } = this.state.values;

    const options = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query : queryValue,
      }),
    };

    fetch('/api/site-search', options)
    .then(r => r.json())
    .then(data => {
      console.log(data);
    })
    .catch(data => {
      console.log(data);
    })
  }

  render() {
    const {
      values : {
        queryValue,
      },
    } = this.state;
    const { className } = this.props;

    return (
    <div className={`site-search ${className || ''}`}>
      <InputText
        fieldName="query"
        fieldValue={queryValue}
        getFieldChanged={this.handleValueChanged}
        setFieldDirty={this.handleDirtyChanged}
        onKeyUp={e => e.keyCode === 13 && this.submitQuery(e)}
      />
      <button>
        Submit
      </button>
    </div>
    )
  }
}