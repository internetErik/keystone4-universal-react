import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import InputText from '../../inputs/InputText';

import debounce from '../../util/debounce';

/**
 * [description]
 * @param  {[type]} ) [description]
 * @return {[type]}   [description]
 */
function fetchData(state, props, setState) {
  const { apiPath, requestBodyKey, responseLens, typeaheadResultCallback } = this.props;
  const { typeaheadFieldValue } = this.state;
  const options = {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Accept'       : 'application/json',
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({ [requestBodyKey] : typeaheadFieldValue}),
  };

  fetch(apiPath, options)
    .then(r => r.json())
    .then(results => {
      const typeaheadResults = responseLens(results);
      this.setState({ typeaheadResults });
      if(typeaheadResultCallback)
        typeaheadResultCallback({
          value  : typeaheadFieldValue,
          result : typeaheadResults,
        });
    })
    .catch(err => console.error('Error', err))
}

export default class InputTypeahead extends React.Component {

  constructor() {
    super()
    this.state = {
      typeaheadFieldValue : '',
      typeaheadResults    : [],
    }
  }

  static propTypes = {
    className       : PropTypes.string,
    inputClassName  : PropTypes.string,
    fieldName       : PropTypes.string.isRequired,
    fieldValue      : PropTypes.string,
    getFieldChanged : PropTypes.func.isRequired,
    setFieldDirty   : PropTypes.func.isRequired,
    labelText       : PropTypes.string,
    inputType       : PropTypes.string,
    autocomplete    : PropTypes.string,
    maxLength       : PropTypes.number,
    hasError        : PropTypes.bool,
    selectOnFocus   : PropTypes.bool,
    onKeyUp         : PropTypes.func,
    valueFormatter  : PropTypes.func,
    blurFormatter   : PropTypes.func,

    // specific to typeahead component
    apiPath                  : PropTypes.string.isRequired,
    requestBodyKey           : PropTypes.string.isRequired,
    responseLens             : PropTypes.func.isRequired,
    typeaheadResultsRenderer : PropTypes.func.isRequired,
    typeaheadResultCallback  : PropTypes.func,
    debounceDelay            : PropTypes.number,
  }

  // this function will be re-assigned later when the component mounts
  fetchData = () => {}

  componentDidMount() {
    const { debounceDelay } = this.props;
    // debounce the fetch data function
    this.fetchData = debounce.call(this, fetchData, debounceDelay || 100);
  }

  /**
   * [description]
   * @return {[type]} [description]
   */
  getFieldChanged = change =>
    this.setState({ ...change }, () => this.fetchData(this.state, this.props, this.setState))

  /**
   * [description]
   * @return {[type]} [description]
   */
  setFieldDirty = () => this.props.setFieldDirty({[this.props.fieldName + 'Dirty']: true})

  /**
   * [description]
   * @param  {[type]} result [description]
   * @return {[type]}        [description]
   */
  selectResult = result => {
    const { fieldName, getFieldChanged } = this.props;
    this.setState({ typeaheadFieldValue : '', typeaheadResults : [] });
    getFieldChanged({
      [fieldName + 'Value']: result,
    })
  }

  render() {
    const { className, typeaheadResultsRenderer, setFieldDirty, fieldValue } = this.props;
    const { typeaheadFieldValue, typeaheadResults } = this.state;
    return (
    <div className={`input-typeahead posr fz14 ${className || ''}`}>
      <div
        className="input-typeahead__field-wrapper"
        onClick={() => fieldValue && this.selectResult()}
      >
      <InputText
        {...this.props}
        fieldName="typeaheadField"
        fieldValue={fieldValue ? fieldValue : typeaheadFieldValue}
        disabled={!!fieldValue }
        getFieldChanged={this.getFieldChanged}
        setFieldDirty={this.setFieldDirty}
      />
      </div>
      {typeaheadResults.length > 0 &&
      <div className={`input-typeahead__results curp h1 posr z1 ${typeaheadFieldValue === '' ? 'dn' : ''}`}>
        <div className="posa mah300 oys w100% bgc-alabaster p5">
          {
            typeaheadResults.map((result, i) => (
            <div
              key={i}
              className="input-typeahead__results-result bgc-almond:h"
              onClick={() => this.selectResult(result)}
            >
              { typeaheadResultsRenderer(result) }
            </div>
            ))
          }
        </div>
        }
      </div>
      }
    </div>
    );
  }
}
