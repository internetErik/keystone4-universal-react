import React from 'react';
import PropTypes from 'prop-types';

export default class InputText extends React.Component {

  static propTypes = {
    className       : PropTypes.string,
    inputClassName  : PropTypes.string,
    fieldName       : PropTypes.string.isRequired,
    fieldValue      : PropTypes.string.isRequired,
    getFieldChanged : PropTypes.func.isRequired,
    setFieldDirty   : PropTypes.func.isRequired,
    labelText       : PropTypes.string,
    inputType       : PropTypes.string,
    autocomplete    : PropTypes.string,
    maxLength       : PropTypes.number,
    hasError        : PropTypes.bool,
    disabled        : PropTypes.bool,
    selectOnFocus   : PropTypes.bool,
    onKeyUp         : PropTypes.func,
    valueFormatter  : PropTypes.func,
    blurFormatter   : PropTypes.func,
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  render() {
    const {
      className,
      inputClassName,
      fieldName,
      fieldValue,
      getFieldChanged,
      setFieldDirty,
      labelText,
      inputType,
      autocomplete,
      maxLength,
      hasError,
      disabled,
      selectOnFocus,
      onKeyUp,
      valueFormatter,
      blurFormatter,
    } = this.props;

    const extraInputAttributes = {
      ...(maxLength ? { maxLength } : {}),
      ...(autocomplete ? { autoComplete : autocomplete } : {}),
    };

    return (
    <div className={`input-text posr ${className || ''}`}>
      {labelText &&
        <label
          onClick={() => this.input.focus()}
          htmlFor={fieldName}
          className="input-text__label fz16"
        >
          {labelText}
        </label>
      }
      <input
        className={`input-text__input bgc-alabaster bdrs4 w100% h56 pl10 mt8 fz16 ${hasError ? 'bd2-s-bright-red' : 'bd2-s-dark-gray'} ${this.input && this.input.value.length > 0 ? 'input-text__input--has-value' : ''} ${inputClassName || ''}`}
        name={fieldName}
        value={fieldValue}
        type={inputType || 'text'}
        onFocus={() => selectOnFocus && this.input.select()}
        ref={input => this.input = input}
        {...disabled ? { disabled: true } : {}}
        onChange={() => getFieldChanged({
            [fieldName + 'Value']: valueFormatter ? valueFormatter(this.input.value, this.input) : this.input.value
          })
        }
        onBlur={() => {
          if(blurFormatter)
            getFieldChanged({
              [fieldName + 'Value']: blurFormatter(this.input.value)
            })
          setFieldDirty({[fieldName + 'Dirty']: true});
        }}
        onKeyUp={e => onKeyUp && onKeyUp(e, this.input)}
        { ...extraInputAttributes }
      />
    </div>
    );
  }
}
