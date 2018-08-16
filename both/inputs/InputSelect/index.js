import React from 'react';
import PropTypes from 'prop-types';

// this is a class so we can use ref
export default class InputSelect extends React.Component {

  static propTypes = {
    fieldName       : PropTypes.string.isRequired,
    fieldValue      : PropTypes.oneOfType([
                      PropTypes.string,
                      PropTypes.number]).isRequired,
    getFieldChanged : PropTypes.func.isRequired,
    setFieldDirty   : PropTypes.func.isRequired,
    children        : PropTypes.array.isRequired,
    hasError        : PropTypes.bool.isRequired,
    disabled        : PropTypes.bool,
    labelText       : PropTypes.string,
    className       : PropTypes.string,
  };

  render() {
    const {
      fieldName,
      fieldValue,
      getFieldChanged,
      children,
      hasError,
      disabled,
      setFieldDirty,
      labelText,
      className,
    } = this.props;

    return (
    <div className="input-select w100% posr fz16">
      {labelText &&
        <label className="input-select__label fz16">
          {labelText}
        </label>
      }
      <select
        className={`input-select__input h56 bdrs4 fz16 mt8 ${hasError ? 'bd2-s-bright-red' : 'bd2-s-dark-gray' } ${this.input && this.input.value === '' ? 'c-gray' : 'c-black'} ${className || ''}`}
        name={fieldName}
        ref={input => this.input = input}
        onChange={() => getFieldChanged({ [fieldName + 'Value']: this.input.value })}
        onBlur={() => setFieldDirty({[fieldName + 'Dirty']: true})}
        {...disabled ? { disabled: true } : {}}
        value={fieldValue}
      >
        {children}
      </select>
    </div>
    );
  }
}
