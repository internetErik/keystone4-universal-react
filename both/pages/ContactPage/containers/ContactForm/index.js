import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import InputText     from '../../../../inputs/InputText';
import InputTextarea from '../../../../inputs/InputTextarea';
import InputError    from '../../../../inputs/InputError';

import {
  getDirtyFields,
  formHasErrors,
} from '../../../../util/form-helpers';

const initialValues = {
  subjectValue : '',
  messageValue : '',
}

const initialDirty = {
  subjectDirty : false,
  messageDirty : false,
}

const initialErrors = {
  subjectRequiredError : false,
  messageRequiredError : false,
}

export default class ContactForm extends React.Component {

  constructor() {
    super();
    this.state = {
      values : { ...initialValues },
      dirty  : { ...initialDirty },
      errors : { ...initialErrors },
      formDisabled : false,
      formMessage  : '',
    };
  }

  static propTypes = {
    className : PropTypes.string,
  }

  handleValueChanged = change => this.setState({ values : { ...this.state.values, ...change } }, this.validateForm)

  handleDirtyChanged = change => this.setState({ dirty : { ...this.state.dirty, ...change } })

  /**
   * [description]
   * @return {Promise}   [description]
   */
  validateForm = () => new Promise((resolve, reject) => {
    const {
      values : {
        subjectValue,
        messageValue,
      },
      dirty : {
        subjectDirty,
        messageDirty,
      }
    } = this.state;

    const errors = { ...initialErrors };

    if(subjectDirty)
      errors.subjectRequiredError = subjectValue === '';

    if(messageDirty)
      errors.messageRequiredError = messageValue === '';

    this.setState({ errors }, resolve);
  })

  /**
   * Submit request to backend api
   * @param  {Object} enquiry The enquiry we are submitting
   * @return {Promise}
   */
  submitRequest = enquiry => new Promise((resolve, reject) => {
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        enquiry : {
          subject : enquiry.subjectValue,
          message : enquiry.messageValue,
        }
      }),
    };

    fetch('/api/contact', options)
      .then(r => r.json())
      .then(data => {
        if(data.error)
          throw(data);
        else {
          this.setState({ formMessage : 'Thank you for your enquiry!' });
          resolve(data);
        }
      })
      .catch(data => {
        this.setState({ formDisabled : false  });
        reject(data)
      })
  })

  /**
   * Handles the submision of the form
   */
  handleSubmit = () => this.setState({
    dirty : {
      ...getDirtyFields(initialDirty),
    },
    formDisabled : true,
  }, () => {
    this.validateForm()
      .then(() => {
        if(formHasErrors(initialErrors, this.state.errors))
          this.setState({ formDisabled : false });
        else
          this.submitRequest(this.state.values)
          // .then(data => this.props.messageSend())
          // .catch();
      })
  })

  render() {
    const {
      values : {
        subjectValue,
        messageValue,
      },
      errors : {
        subjectRequiredError,
        messageRequiredError,
      },
      formDisabled,
      formMessage,
    } = this.state;
    const { className } = this.props;
    return (
    <div className={`contact-form ${ className || '' }`}>
      <form
        className={`contact-form__form ${ formDisabled && 'op.7' }`}
        onSubmit={e => e.preventDefault()}
      >
        <div>
          <InputText
            fieldName="subject"
            fieldValue={subjectValue}
            getFieldChanged={this.handleValueChanged}
            setFieldDirty={this.handleDirtyChanged}
            labelText="Subject:"
            hasError={subjectRequiredError}
          />
          <InputError
            hasError={subjectRequiredError}
            renderMessage={ () => <span>You must provide a subject.</span> }
          />
        </div>
        <div>
          <InputTextarea
            fieldName="message"
            fieldValue={messageValue}
            getFieldChanged={this.handleValueChanged}
            setFieldDirty={this.handleDirtyChanged}
            labelText="Message:"
            hasError={messageRequiredError}
          />
          <InputError
            hasError={messageRequiredError}
            renderMessage={ () => <span>You must provide a message.</span> }
          />
        </div>
        <div>
          <button
            className={`contact-form__submit-button bd1-s-black p10 ${ formDisabled && 'bgc-gray' }`}
            onClick={this.handleSubmit}
            {...(formDisabled ? { disabled : true } : {})}
          >
            Submit
          </button>
        </div>
      </form>
      <div>{ formMessage }</div>
    </div>
    );
  }
}