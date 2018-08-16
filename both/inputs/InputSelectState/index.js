import React from 'react';
import PropTypes from 'prop-types';
import InputSelect from '../InputSelect';

const states = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona ',
  AR: 'Arkansas',
  CA: 'California ',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia ',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
}

const InputSelectState = props => (
<InputSelect {...props} >
  <option value=""></option>
  {
    Object.keys(states).map((key, i) => (
      <option
        key={i}
        value={props.abbrStateValue ? key : states[key]}
      >
        { props.abbrStateDisplay ? key : states[key] }
      </option>
    ))
  }
</InputSelect>
);

InputSelectState.propTypes = {
  className        : PropTypes.string,
  fieldName        : PropTypes.string.isRequired,
  fieldValue       : PropTypes.string.isRequired,
  setFieldDirty    : PropTypes.func.isRequired,
  getFieldChanged  : PropTypes.func.isRequired,
  hasError         : PropTypes.bool.isRequired,
  hasError         : PropTypes.bool.isRequired,
  abbrStateValue   : PropTypes.bool,
  abbrStateDisplay : PropTypes.bool,
};

export default InputSelectState;
