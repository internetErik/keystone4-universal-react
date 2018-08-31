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
      clearHandle   : ()=>{},
    };
  }

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
    }),
  };

  /**
   * This gets a method from the inside of the typeahead that we can use to clear the input
   *
   * @param  {function} clearHandle function we can call to clear the typeahead
   */
  getClearHandle = clearHandle => this.setState({ clearHandle });

  /**
   * Get the list of values from the typeahead. We need these to handle a keyUp
   * event for <enter>
   *
   * @param  {Array} options.result the list of results
   */
  handleSearchResultsChanged = ({ result }) => this.setState({ searchResults : result })

  /**
   * When user presses enter, 'click' on the first entry
   *
   * @param  {Object} e The keyUp event
   */
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
        getClearHandle={this.getClearHandle}
        typeaheadResultCallback={this.handleSearchResultsChanged}
        responseLens={response => [ ...response.results, ...response.defaultResults ]}
        typeaheadResultsRenderer={result => <a href={result.path}>{ result.name }</a>}
      />
    </div>
    )
  }
}