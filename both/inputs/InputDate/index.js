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
const formatDateField = (value, input) => {
  const { length } = value;
  const { selectionStart } = input;
  value = value.replace(/\D/g, '');
  if(length > 5)
    value = `${value.substr(0,2)}/${value.substr(2,2)}/${value.substr(4,4)}`;
  else if(length > 3)
    value = `${value.substr(0,2)}/${value.substr(2,2)}`;
  else if(length === 1 && value[0] !== '0' && value[0] !== '1')
    value = `0${value}`;

  lastValue = value;
  lastSelectionStart = selectionStart
  return value;
}

/**
 * On blur, takes the value of a form input and fomats it to a date format
 *
 * @param  {string} value The current value of the input
 * @return {string}       New value for the input
 */
const formatOnBlur = value => {
  return value;
}

const InputDate = props =>(
<div className={`input-date ${props.outerClassName || ''}`}>
  <InputText
    {...props}
    valueFormatter={formatDateField}
    blurFormatter={formatOnBlur}
  />
</div>
);

InputDate.propTypes = {
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

export default InputDate;
