import React from 'react';
import PropTypes from 'prop-types';
import InputButtonCheckbox from './components/InputButtonCheckbox';

export default class InputButtonCheckboxGroup extends React.Component {

  constructor(props) {
    super();

    this.state = {
      buttons: props.fieldValue,
    };
  }

  static propTypes = {
    className      : PropTypes.string,
    buttonClassName: PropTypes.string,
    multiSelect    : PropTypes.bool,
    fieldName      : PropTypes.string.isRequired,
    getFieldChanged: PropTypes.func.isRequired,
    hasError       : PropTypes.bool.isRequired,
    fieldValue     : PropTypes.arrayOf(PropTypes.shape({
                       fieldName     : PropTypes.string.isRequired,
                       labelText     : PropTypes.string.isRequired,
                       fieldValue    : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
                       fieldSelected : PropTypes.bool.isRequired,
                       className     : PropTypes.string,
                     })).isRequired,
  };

  getFieldChanged = field => {
    const { fieldName, multiSelect } = this.props;
    // apply a different map depending on if we are multi-selecing or not
    const buttons = multiSelect
    ? this.state.buttons.map(b => b.fieldName === field.fieldName
        ? (b.fieldSelected = !b.fieldSelected, b)
        : b
      )
    : this.state.buttons.map(b => b.fieldName === field.fieldName
        ? (b.fieldSelected = !b.fieldSelected, b)
        : (b.fieldSelected = false, b)
      );
    // after we update the state, propogate this to the parent
    this.setState({ buttons }, () => this.props.getFieldChanged({ [`${fieldName}Value`]: buttons }));
  }

  render() {
    const { className, buttonClassName, hasError, getFieldChanged } = this.props;
    const { buttons } = this.state;

    return (
    <div className={`input-button-checkbox-group clearfix ${ className || ''}`}>
    {
    buttons.map(({ fieldName, labelText, fieldValue, fieldSelected, className }, i) =>
      <InputButtonCheckbox
        key={i}
        className={`buttonClassName ${className || ''}`}
        labelText={labelText}
        fieldName={fieldName}
        fieldValue={fieldValue}
        fieldSelected={fieldSelected}
        hasError={hasError}
        getFieldChanged={(field) => this.getFieldChanged(field)}
      />
    )
    }
    </div>
    );
  }
}
