import React from 'react';
import PropTypes from 'prop-types';

const noResize = {
  resize: 'none',
};

export default class InputTextarea extends React.Component {

  static propTypes = {
    fieldName        : PropTypes.string.isRequired,
    fieldValue       : PropTypes.string.isRequired,
    getFieldChanged  : PropTypes.func.isRequired,
    setFieldDirty    : PropTypes.func.isRequired,
    maxCharacterCount: PropTypes.number,
    allowResize      : PropTypes.bool,
    placeHolder      : PropTypes.string,
    labelText        : PropTypes.string,
    className        : PropTypes.string,
  };

  render() {
    const {
      fieldName,
      fieldValue,
      getFieldChanged,
      setFieldDirty,
      maxCharacterCount,
      allowResize,
      placeHolder,
      labelText,
      className,
    } = this.props;

    const textareaStyle = allowResize === false ? noResize : {};

    return (
    <div className="input-textarea">
      {labelText &&
        <label
          onClick={() => this.input.focus()}
          htmlFor={fieldName}
          className="input-textarea__label fz16"
        >
          {labelText}
        </label>
      }
      <textarea
        className={`w100% bgc-alabaster bd2-s-dark-gray bdrs4 ${ className || ''}`}
        id={fieldName}
        style={textareaStyle}
        ref={input => this.input = input}
        onChange={() => getFieldChanged({[fieldName + 'Value']: this.input.value})}
        onBlur={() => setFieldDirty({[fieldName + 'Dirty']: true})}
        maxLength={maxCharacterCount}
        placeholder={placeHolder}
        value={fieldValue}
      >
      </textarea>
      {maxCharacterCount &&
      <div className="flr c-middle-gray fz10">
        ({maxCharacterCount - fieldValue.length} characters left)
      </div>
      }
    </div>
    );
  }
}
