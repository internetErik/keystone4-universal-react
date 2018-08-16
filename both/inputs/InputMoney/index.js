import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../InputText';

/**
 * Takes the value of a form input and fomats it to a money format
 *
 * @param  {string} value The current value of the input
 * @param  {string} max   The highest number value possible - will override value
 * @return {string}       New value for the input
 */
const max = 25000;
const formatDollarField = (value, input) => {
  const length = value.length;
  const dollarOnly = length === 1 && value === '$';
  if(length === 0 || dollarOnly)
    return '$';
  else {
    const vals = value.split('.');
    if(vals.length > 1 && vals[1].length > 2)
      vals[1] = vals[1].substr(0,2);
    const endsInDot = vals.length > 1 && vals[1].length === 0;
    const decimalPlaces = vals.length > 1 ? vals[1].length : 0;
    value = vals.join('.');
    let num = parseFloat(value[0] === '$' ? value.substr(1) : value, 10);
    if(num === Infinity || num > max) num = max;
    return (num === num)
      ? `$${num.toFixed(decimalPlaces)}${endsInDot ? '.' : ''}`
      : '$';
  }
}

/**
 * On blur, takes the value of a form input and fomats it to a money format
 *
 * @param  {string} value The current value of the input
 * @return {string}       New value for the input
 */
const formatOnBlur = value => {
  const num = parseFloat(value.substr(1), 10);
  return num === num ? `$${num.toFixed(2)}` : '$0.00';
}

const InputMoney = props =>(
<div className={`input-money ${props.outerClassName || ''}`}>
  <InputText
    {...props}
    valueFormatter={formatDollarField}
    blurFormatter={formatOnBlur}
  />
</div>
);

InputMoney.propTypes = {
  className      : PropTypes.string,
  outerClassName : PropTypes.string,
  fieldName      : PropTypes.string.isRequired,
  fieldValue     : PropTypes.string.isRequired,
  getFieldChanged: PropTypes.func.isRequired,
  setFieldDirty  : PropTypes.func.isRequired,
  labelText      : PropTypes.string,
  hasError       : PropTypes.bool,
  selectOnFocus  : PropTypes.bool,
  onKeyUp        : PropTypes.func,
};

export default InputMoney;
