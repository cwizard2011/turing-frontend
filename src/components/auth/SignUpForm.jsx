import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextField from '../common/TextField';
import SignUpInputValidation from '../../validations/SignUpInputValidate';
import ErrorAlertNotification from '../common/ErrorAlertNotification';
import { userSignUpRequest, deleteErrorMessage } from '../../actions/signUp.action';


/**
 * @class SignUpForm
 */
export class SignUpForm extends Component {
    state = {
      fullname: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      success: {},
      done: false,
      isLoading: false,
      error: {},
    };


  /**
   *
   * @param {*} event
   * @returns {*} - state
   */
  onChange = (event) => {
    const { errors } = this.state;
    if (errors[event.target.name]) {
      const error = Object.assign({}, errors);
      delete errors[event.target.name];
      this.setState({
        [event.target.name]: event.target.value, error
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value

      });
    }
  }

  handleDelete = () => {
    const { deleteError } = this.props;
    deleteError();
    this.setState({
      password: '',
      password_confirmation: '',
    });
  }

  /**
   *
   * @param {*} event
   * @returns {*} - state
   */
  onSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      const { signUp, userProfile } = this.props;
      const { username } = this.state;
      signUp(this.state)
        .then(() => {
          userProfile(username);
        });
    }
  }

  /**
   * isValid
   * @returns {*} - state
   */
  isValid() {
    const { errors, isValid } = SignUpInputValidation.InputValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   *
   * @param {*} event
   * @returns {*} - state
   */
  render() {
    const { auth } = this.props; // eslint-disable-line
    if (auth) {
      return <Redirect to="/" />;
    }
    const {
      errors, email, fullname, password, password_confirmation // eslint-disable-line
    } = this.state;

    const { error } = this.props; // eslint-disable-line

    const form = (
      <div className="card">
        <div>
          <small className="form-text login-label">Welcome to ShopMate</small>
          <small className="form-text login-label-2">
          You can join the community by filling this form
          </small>
        </div>
        <div className="card-body">
          {
                (error && error.message) ? (
                  <ErrorAlertNotification
                    errors={error.message}
                    onClick={this.handleDelete}
                  />
                ) : ''
              }
          <form>
            <div className="form-row">
              <div className="form-group col-md-6 custom">
                <TextField
                  error={errors.firstname}
                  onChange={this.onChange}
                  value={fullname}
                  placeholder="fullname"
                  field="fullname"
                  className="fullname"
                />
              </div>
              <div className="form-group col-md-6 custom">
                <TextField
                  error={errors.email}
                  onChange={this.onChange}
                  value={email}
                  placeholder="email"
                  field="email"
                  className="myemail"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6 custom">
                <TextField
                  error={errors.password}
                  onChange={this.onChange}
                  value={password}
                  type="password"
                  placeholder="password"
                  field="password"
                  className="mypassword"
                />
              </div>
              <div className="form-group col-md-6 custom">
                <TextField
                  error={errors.password_confirmation}
                  onChange={this.onChange}
                  value={password_confirmation} // eslint-disable-line
                  type="password"
                  placeholder="confirm password"
                  field="password_confirmation"
                  className="mypassword_confirmation"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <button type="button" className="btn login-btn register" onClick={this.onSubmit}>
                      SIGN UP
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
    return (
      <div>
        {form}
      </div>
    );
  }
}

SignUpForm.propTypes = {
  signUp: PropTypes.func.isRequired,
  deleteError: PropTypes.func.isRequired,
  userProfile: PropTypes.func,
  error: PropTypes.shape({}),
  auth: PropTypes.bool
};

const mapDispatchToProps = dispatch => ({
  signUp: user => dispatch(userSignUpRequest(user)),
  deleteError: () => dispatch(deleteErrorMessage()),
});

const mapStateToProps = state => ({
  error: state.auth.error,
  auth: state.auth.isAuthenticated,
});


export default connect(mapStateToProps, mapDispatchToProps)((SignUpForm));
