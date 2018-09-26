import React from 'react';
import fetch from 'isomorphic-fetch';

import InputText from '../inputs/InputText';
import InputError from '../inputs/InputError';

const initialValues = { passwordValue : '' };
const initialDirty  = { passwordDirty : false };
const initialErrors = { passwordRequiredError : false };

export default class AppLogin extends React.Component {

  constructor() {
    super();
    this.state = {
      ...initialValues,
      ...initialDirty,
      ...initialErrors,
    }
  }

  handleChanged = change => this.setState({ ...change })

  handleSubmit = e => {
    e.preventDefault();
    const { passwordValue } = this.state;
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password : passwordValue }),
    };

    fetch('/api/login', options)
    .then(r => r.json())
    .then(data => {
      if(data.error) return;
      window.location.href = '/';
    })
    .catch(err => {
      reject(err);
    })
  }

  render() {
    const { passwordValue, passwordRequiredError } = this.state;
    return(
    <section className="app-login c-dark-gray w100% oh">
      <form onSubmit={this.handleSubmit}>
        <InputText
          labelText="Password"
          inputType="password"
          fieldValue={passwordValue}
          fieldName="password"
          hasError={passwordRequiredError}
          getFieldChanged={this.handleChanged}
          setFieldDirty={this.handleChanged}
        />
        <InputError
          hasError={passwordRequiredError}
          renderMessage={() => <span>You must enter the correct password</span>}
        />
        <button>Login</button>
      </form>
    </section>
    );
  }
}
