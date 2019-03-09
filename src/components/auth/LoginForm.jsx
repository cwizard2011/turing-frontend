import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from 'is-empty';
import TextField from '../common/TextField';
import loginAction, {
  deleteErrorMessages
} from '../../actions/loginAction.action';
import UserInputValidation from '../../validations/validateLogin';
import ErrorAlertNotification from '../common/ErrorAlertNotification';
import { hideLoginModal } from '../../actions/modal.action';
import browserHistory from '../../utils/history';
import Loading from '../common/Loading';


/**
 * @description Login form component
 *
 * @class LoginForm
 *
 * @param {object} event
 *
 * @extends {Component}
 */
export class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    isLoading: false,
  };

  onChange = (event) => {
    const { errors } = this.state;
    if (errors[event.target.name]) {
      const newErrors = Object.assign({}, errors);
      delete newErrors[event.target.name];
      this.setState({
        [event.target.name]: event.target.value,
        errors: newErrors
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  closeModal = () => {
    const { hideModal } = this.props;
    hideModal();
  };

  onSubmit = (event) => {
    const { login } = this.props;
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      login(this.state).then(() => {
        browserHistory.push('/items');
        this.setState({ isLoading: false });
      });
    }
  };

  handleDelete = () => {
    const { deleteErrorMessage } = this.props;
    deleteErrorMessage();
    this.setState({
      password: '',
      password_confirmation: ''
    });
  };

  isValid = () => {
    const { errors, isValid } = UserInputValidation.loginInputValidation(
      this.state
    );

    if (!isValid) {
      this.setState({ errors, password: '' });
    }

    return isValid;
  };

  /**
   * @description Render the JSX template
   *
   * @memberof Login
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { error, auth } = this.props;
    const {
      email, password, errors, isLoading
    } = this.state;

    if (auth) {
      return <Redirect to="#" />;
    }
    if (isLoading) {
      return (
        <div className="d-flex">
          <div className="row d-flex justify-content-center">
            <Loading />
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="card border-0">
          <div>
            <small className="form-text login-label">
              Welcome to Shopmate
            </small>
          </div>
          <div className="card-body">
            {!isEmpty(error) && (
              <ErrorAlertNotification
                errors={error.message}
                onClick={this.handleDelete}
              />
            )}
            <form onSubmit={this.onSubmit}>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <TextField
                    error={errors.email}
                    label="email"
                    onChange={this.onChange}
                    value={email}
                    placeholder="email"
                    field="email"
                    type="text"
                    className="email"
                  />
                </div>
                <div className="form-group col-md-12">
                  <TextField
                    error={errors.password}
                    label="password"
                    onChange={this.onChange}
                    value={password}
                    placeholder="password"
                    field="password"
                    type="password"
                    className="password"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <button
                    type="submit"
                    className="btn login-btn submit"
                    onClick={this.onSubmit}
                  >
                    SIGN IN
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  auth: PropTypes.bool,
  error: PropTypes.shape({}),
  history: PropTypes.shape({}),
  login: PropTypes.func.isRequired,
  deleteErrorMessage: PropTypes.func,
  hideModal: PropTypes.func,
};

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginAction(user)),
  deleteErrorMessage: () => dispatch(deleteErrorMessages()),
  hideModal: () => dispatch(hideLoginModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
