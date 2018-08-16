import React from 'react';
import PropTypes from 'prop-types';

const InputError = ({hasError, renderMessage, className}) => (
<div className={`input-error c-bright-red fz12 ${className || ''}`}>
  {hasError && renderMessage()}
</div>
);

InputError.propTypes = {
  hasError      : PropTypes.bool.isRequired,
  renderMessage : PropTypes.func.isRequired,
  className     : PropTypes.string,
}

export default InputError;
