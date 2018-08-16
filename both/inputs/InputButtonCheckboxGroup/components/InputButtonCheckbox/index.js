import React from 'react';
import PropTypes from 'prop-types';

export default class InputButtonCheckbox extends React.Component {

  static propTypes = {
    className      : PropTypes.string,
    labelText      : PropTypes.string,
    fieldName      : PropTypes.string.isRequired,
    fieldValue     : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    fieldSelected  : PropTypes.bool.isRequired,
    hasError       : PropTypes.bool.isRequired,
    getFieldChanged: PropTypes.func.isRequired,
  };

  render() {
    const {
      className,
      labelText,
      fieldName,
      fieldValue,
      fieldSelected,
      hasError,
      getFieldChanged,
    } = this.props;

    return (
    <span className={`input-button-checkbox ${ className || ''}`}>
      <input
        type="checkbox"
        className="input-button-checkbox__checkbox dn"
        id={fieldName}
        checked={fieldSelected}
        value={fieldValue}
        ref={checkbox => this.checkbox = checkbox}
        onChange={
          () => getFieldChanged({
            fieldName,
            fieldSelected: !fieldSelected,
          })
        }
      />
      <span className="fll w20% w50%@sm pr8">
        <label
          htmlFor={fieldName}
          className={`input-button-checkbox__label posr dib w100% curp bdrs4 h56 dib ${hasError ? 'bd2-s-bright-red' : 'bd2-s-dark-gray'} ${ fieldSelected ? 'c-white bgc-dark-purple bxsh0-2-2-0-shadow' : 'bgc-alabaster' }`}
        >
          <span className="posa center">{ labelText }</span>
        </label>
      </span>
    </span>
    );
  }
}
