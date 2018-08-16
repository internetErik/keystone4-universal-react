import React from 'react';
import PropTypes from 'prop-types';

export default class InputCheckbox extends React.Component {

  static propTypes = {
    className      : PropTypes.string,
    labelText      : PropTypes.string,
    renderLabel    : PropTypes.func,
    labelClassName : PropTypes.string,
    color          : PropTypes.string,
    fieldName      : PropTypes.string.isRequired,
    fieldValue     : PropTypes.bool.isRequired,
    getFieldChanged: PropTypes.func.isRequired,
    setFieldDirty  : PropTypes.func,
    resultValueKey : PropTypes.func,
  };

  componentDidMount() {
    const { fieldName, getFieldChanged } = this.props;
    if(this.checkbox.checked)
      getFieldChanged({
        [this.resultValueKeyFunction(fieldName)]: true,
      });
  }

  // string -> string
  resultValueKeyFunction = fieldName => this.props.resultValueKey ? this.props.resultValueKey(fieldName) : `${fieldName}Value`;

  render() {
    const {
      className,
      labelText,
      renderLabel,
      color,
      fieldName,
      fieldValue,
      getFieldChanged,
      setFieldDirty,
      resultValueKey,
    } = this.props;

    return (
    <span className={`input-checkbox ${ className || ''}`}>
      <input
        type="checkbox"
        className="input-checkbox__checkbox dn"
        id={fieldName}
        checked={fieldValue}
        ref={checkbox => this.checkbox = checkbox}
        onChange={
          () => {
            getFieldChanged({
              [this.resultValueKeyFunction(fieldName)]: !fieldValue,
            });
            setFieldDirty && setFieldDirty({[fieldName + 'Dirty']: true})
          }
        }
      />
      <label
        htmlFor={fieldName}
        className={`input-checkbox__label curp posr w100% dib`}
      >
        <span className={`input-checkbox__dummy posr curp dib h18 w18 bd1-s-${color || 'purple'} ${fieldValue ? `checkbox__dummy--checked bgc-${color || 'purple'}` : 'bgc-white'}`}>
        </span>
        <span className="fz16 ml8 posa center-vert">
          {labelText && labelText }
          {renderLabel && renderLabel() }
        </span>
      </label>
    </span>
    );
  }
}
