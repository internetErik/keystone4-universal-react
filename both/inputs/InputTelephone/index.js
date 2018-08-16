import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../InputText';

let lastSelectionStart = 0;
let lastValue = '';
/**
 * Takes the value of a form input and fomats it to a date format
 *
 * @param  {string} value The current value of the input
 * @return {string}       New value for the input
 */
const formatTelephoneField = (value, input) => {
  const { length } = value;
  const { selectionStart } = input;
  value = value.replace(/\D/g, '');

  if(value.length === 6)
    value = `${value.substr(0,3)}-${value.substr(3,3)}`;
  else if(length > 6)
    value = `${value.substr(0,3)}-${value.substr(3,3)}-${value.substr(6,4)}`;
  else if(value.length === 3)
    value = value;
  else if(length > 3)
    value = `${value.substr(0,3)}-${value.substr(3,3)}`;

  lastValue = value;
  lastSelectionStart = selectionStart
  return value;
}

/**
 * On blur, takes the value of a form input and fomats it to a Telephone format
 *
 * @param  {string} value The current value of the input
 * @return {string}       New value for the input
 */
const formatOnBlur = value => {
  return value;
}

const InputTelephone = props =>(
<div className={`input-telephone ${props.outerClassName || ''}`}>
  <InputText
    {...props}
    valueFormatter={formatTelephoneField}
    blurFormatter={formatOnBlur}
  />
</div>
);

InputTelephone.propTypes = {
  className       : PropTypes.string,
  outerClassName  : PropTypes.string,
  fieldName       : PropTypes.string.isRequired,
  fieldValue      : PropTypes.string.isRequired,
  maxLength       : PropTypes.number,
  getFieldChanged : PropTypes.func.isRequired,
  setFieldDirty   : PropTypes.func.isRequired,
  labelText       : PropTypes.string,
  hasError        : PropTypes.bool,
  selectOnFocus   : PropTypes.bool,
  onKeyUp         : PropTypes.func,
};

export default InputTelephone;
