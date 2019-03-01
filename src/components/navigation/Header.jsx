import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ModalForm from '../modals/Modals';
import Navigation from './Navigation';
import { showLoginModal, showSignupModal } from '../../actions/modal.action';
import appLogo from '../../images/logo';

/**
 * @description class for app header
 *
 * @class Header
 *
 * @extends {Component}
 */
export class Header extends Component {
  /**
   * @description Render the JSX template
   *
   * @returns {JSX} render JSX template
   *
   * @memberof Header
   */
  render() {
    const { modal, showModalSignup } = this.props;
    return (
      <div className="sticky-top main-navbar">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/">
            <img className="logo" src={appLogo} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse top-bar" id="collapsibleNavbar">
            <Navigation />
            <form className="form-inline mr-3">
              <i className="mdi mdi-magnify mdi-24px mr-2 d-none d-md-block" />
              <input
                className="form-control mr-sm-2 border-0"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
            <div>
            Hi!
              {' '}
              <Link to="/" className="auth-link">Sign in</Link>
              {' '}
            or
              {' '}
              <Link to="/"
                className="auth-link"
                onClick={showModalSignup}
              >
                    Register
              </Link>
              <ModalForm modal={modal} />
              {' '}
            </div>
            <Link to="/">
              <span className="fa-stack fa-2x has-badge" data-count="6">
                <i className="fa fa-circle fa-stack-1x fa-inverse" />
                <i className="fa fa-shopping-cart fa-stack-1x red-cart" />
              </span>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(showLoginModal()),
  showModalSignup: () => dispatch(showSignupModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
