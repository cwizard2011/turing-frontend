import React, { Component } from 'react';


/**
 * @description class for userNavigation header
 *
 * @class GuestNavigation
 *
 * @extends {Component}
 */
class Navigation extends Component {
  /**
   * @description Render the JSX template
   *
   * @returns {JSX} render JSX template
   *
   * @memberof Header
   */
  render() {
    return (
      <ul className="navbar-nav mx-auto link-text">
        <li className="nav-item mr-4">
          <a className="nav-link" href="/">Regional</a>
        </li>
        <li className="nav-item mr-4">
          <a className="nav-link" href="#">Nature</a>
        </li>
        <li className="nav-item mr-4">
          <a className="nav-link" href="#">Seasonal</a>
        </li>
      </ul>
    );
  }
}

export default Navigation;
