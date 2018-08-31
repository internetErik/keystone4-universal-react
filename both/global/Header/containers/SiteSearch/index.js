import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import InputText from '../../../../inputs/InputText';
import InputTypeahead from '../../../../inputs/InputTypeahead';

export default class SiteSearch extends React.Component {

  constructor() {
    super();
    this.state = {
      searchResults : [],
      clearHandle   : () => {},
    };
  }

  getClearHandle = clearHandle => this.setState({ clearHandle });

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
    }),
  };

  handleSearchResultsChanged = ({ result }) => this.setState({ searchResults : result })

  handleKeyUp = e => {
    const { router: { history } } = this.context;
    const { searchResults, clearHandle } = this.state;
    if(e.keyCode === 13 && searchResults.length > 0) {
      clearHandle();
      history.push(searchResults[0].path);
    }
  }

  render() {
    const { className } = this.props;

    return (
    <div className={`site-search dib ${className || ''}`}>
      <InputTypeahead
        className="site-search__input w200"
        fieldName="query"
        getFieldChanged={()=>{}}
        setFieldDirty={()=>{}}
        autocomplete="off"
        onKeyUp={this.handleKeyUp}
        debounceDelay={300}
        apiPath="/api/site-search"
        requestBodyKey="query"
        setClearHandle={this.getClearHandle}
        typeaheadResultCallback={this.handleSearchResultsChanged}
        responseLens={response => [ ...response.results, ...response.defaultResults ]}
        typeaheadResultsRenderer={result => <a href={result.path}>{ result.name }</a>}
      />
    </div>
    )
  }
}