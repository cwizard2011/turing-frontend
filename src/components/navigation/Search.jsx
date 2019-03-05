import React, { Component } from 'react';
import PropTypes from 'prop-types';
import browserHistory from '../../utils/history';
// import { ViewProducts } from '../products/ViewProducts';

/**
 * @description class for search
 *
 * @class Search
 *
 * @param {object} event
 *
 * @extends {Component}
 */
export class Search extends Component {
  state = {
    search: '',
  };


  onChange = (event) => {
    this.setState({
      search: event.target.value
    });
  };

  handleKeyPress = (event) => {
    const { search } = this.state;
    if (event.key === 'Enter') {
      return browserHistory.push(`/items?searchTerm=${search}`);
    }
  };

  /**
   * @description Render the JSX template
   *
   * @returns {JSX} render JSX template
   *
   * @memberof Header
   */
  render() {
    const { search } = this.state;
    return (
      <form className="form-inline mr-3">
        <i className="mdi mdi-magnify mdi-24px mr-2 d-none d-md-block" />
        <input
          name="searchTerm"
          value={search}
          onChange={this.onChange}
          onKeyPress={this.handleKeyPress}
          className="form-control mr-sm-2 border-0"
          type="search"
          placeholder="Search..."
          aria-label="Search"
        />
      </form>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({})
};

export default Search;
