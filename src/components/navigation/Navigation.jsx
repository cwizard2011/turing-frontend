import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


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
    const { department } = this.props;
    return (
      <ul className="navbar-nav mx-auto link-text">
        {department.department.map(items => (
          (
            <li className="nav-item mr-4 dropdown" key={items.department_id}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {items.name}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {items.Categories.map(category => (
                  (
                    <Link
                      to={`/products/${items.name}/${category.name}`}
                      key={category.category_id}
                    >
                      <a className="dropdown-item" href="#">{category.name}</a>
                    </Link>
                  )
                ))}
              </div>
            </li>
          )
        ))}
      </ul>
    );
  }
}
Navigation.propTypes = {
  department: PropTypes.shape({})
};

export default Navigation;
