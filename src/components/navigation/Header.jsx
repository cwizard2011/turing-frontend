import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ModalForm from '../modals/Modals';
import Navigation from './Navigation';
import { showLoginModal, showSignupModal } from '../../actions/modal.action';
import { getCartItem } from '../../actions/cart.action';
import routes from '../../constants/routes';
import Loading from '../common/Loading';
import Search from './Search';
import logoutAction from '../../actions/logoutAction.action';
import browserHistory from '../../utils/history';
import { getDepartments } from '../../actions/products.action';

import appLogo from '../../images/logo';

/**
 * @description class for app header
 *
 * @class Header
 *
 * @extends {Component}
 */
export class Header extends Component {
    componentDidMount = () => {
      const {
        auth, getCartTotal, listDepartment
      } = this.props;
      if (auth.isAuthenticated) {
        listDepartment();
        return getCartTotal();
      } else {
        return listDepartment();
      }
    }

    /**
   *
   * @param {*} prevProps previous props
   * @param {*} prevState previous state
   *
   * @returns {*} item objects
   */
    componentDidUpdate(prevProps) {
      const { auth, getCartTotal } = this.props;
      if (prevProps.auth.isAuthenticated !== auth.isAuthenticated && auth.isAuthenticated) {
        return getCartTotal();
      }
    }

    /**
     * @param {*} event logout event
     * @returns {*} logout action
     */
    onLogout = (event) => {
      const { logoutUser, history } = this.props;
      event.preventDefault();
      logoutUser();
      history.push('/');
    }

    /**
   * @description Render the JSX template
   *
   * @returns {JSX} render JSX template
   *
   * @memberof Header
   */
    render() {
      const {
        modal, showModalSignup, showModal, cart, auth, history, department
      } = this.props;
      if (department && !department.department) {
        return (
          <div className="d-flex">
            <div className="row d-flex justify-content-center">
              <Loading />
            </div>
          </div>
        );
      }
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
            {auth.isAuthenticated ? (
              <div className="collapse navbar-collapse top-bar" id="collapsibleNavbar">
                <Navigation department={department} />
                <Search history={history} />
                <Link to="/"
                  className="auth-link"
                  onClick={this.onLogout}
                >
                Logout
                </Link>
                <Link to={routes.SHOPPING_CART}>
                  <span
                    className="fa-stack fa-2x has-badge"
                    data-count={cart && cart.total && cart.total !== null ? cart.total : 0}
                  >
                    <i className="fa fa-circle fa-stack-1x fa-inverse" />
                    <i className="fa fa-shopping-cart fa-stack-1x red-cart" />
                  </span>
                </Link>
              </div>
            ) : (
              <div className="collapse navbar-collapse top-bar" id="collapsibleNavbar">
                <Navigation department={department} />
                <Search history={history} />
                <div>
            Hi!
                  {' '}
                  <Link to="#"
                    className="auth-link"
                    onClick={showModal}
                  >
                Sign in
                  </Link>
                  <ModalForm history={history} modal={modal} />
                  {' '}
            or
                  {' '}
                  <Link to="#"
                    className="auth-link"
                    onClick={showModalSignup}
                  >
                    Register
                  </Link>
                  <ModalForm modal={modal} history={history} />
                  {' '}
                </div>
                <Link to={routes.SHOPPING_CART}
                  className="auth-link"
                  onClick={showModal}
                >
                  <span
                    className="fa-stack fa-2x has-badge"
                    data-count={cart && cart.total && cart.total >= 1 ? cart.total : 0}
                  >
                    <i className="fa fa-circle fa-stack-1x fa-inverse" />
                    <i className="fa fa-shopping-cart fa-stack-1x red-cart" />
                  </span>
                </Link>
              </div>
            )}
          </nav>
          <hr className="my-0 nav-divider" />
        </div>
      );
    }
}

Header.propTypes = {
  showModalSignup: PropTypes.func,
  showModal: PropTypes.func,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool
  }),
  modal: PropTypes.shape({}),
  department: PropTypes.shape({}),
  cart: PropTypes.shape({}),
  history: PropTypes.shape({}),
  getCartTotal: PropTypes.func,
  logoutUser: PropTypes.func,
  listDepartment: PropTypes.func,
};

const mapStateToProps = state => ({
  department: state.department,
  modal: state.modal,
  auth: state.auth,
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(showLoginModal()),
  showModalSignup: () => dispatch(showSignupModal()),
  getCartTotal: () => dispatch(getCartItem()),
  logoutUser: () => dispatch(logoutAction()),
  listDepartment: () => dispatch(getDepartments())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
