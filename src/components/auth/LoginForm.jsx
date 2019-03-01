// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import isEmpty from 'is-empty';
// import TextField from '../common/TextField';
// import loginAction, {
//   deleteErrorMessages
// } from '../../actions/authentication/loginAction';
// import UserInputValidation from '../../validations/validateLogin';
// import ErrorAlertNotification from '../common/ErrorAlertNotification';
// import SocialLogin from '../socialLogin/SocialLogin';
// import routes from '../../constants/routes';
// import { hideLoginModal } from '../../actions/modal.action';
// import userProfileAction from '../../actions/profile/userProfile.action';


// /**
//  * @description Login form component
//  *
//  * @class LoginForm
//  *
//  * @param {object} event
//  *
//  * @extends {Component}
//  */
// export class LoginForm extends Component {
//   state = {
//     username: '',
//     password: '',
//     errors: {}
//   };

//   onChange = (event) => {
//     const { errors } = this.state;
//     if (errors[event.target.name]) {
//       const newErrors = Object.assign({}, errors);
//       delete newErrors[event.target.name];
//       this.setState({
//         [event.target.name]: event.target.value,
//         errors: newErrors
//       });
//     } else {
//       this.setState({
//         [event.target.name]: event.target.value
//       });
//     }
//   };

//   closeModal = () => {
//     const { hideModal } = this.props;
//     hideModal();
//   };

//   onSubmit = (event) => {
//     const { login, userProfile } = this.props;
//     const { username } = this.state;
//     event.preventDefault();
//     if (this.isValid()) {
//       this.setState({ errors: {} });
//       login(this.state)
//         .then(() => {
//           userProfile(username);
//         });
//     }
//   };

//   handleDelete = () => {
//     const { deleteErrorMessage } = this.props;
//     deleteErrorMessage();
//     this.setState({
//       password: '',
//       password_confirmation: ''
//     });
//   };

//   isValid = () => {
//     const { errors, isValid } = UserInputValidation.loginInputValidation(
//       this.state
//     );

//     if (!isValid) {
//       this.setState({ errors, password: '' });
//     }

//     return isValid;
//   };

//   /**
//    * @description Render the JSX template
//    *
//    * @memberof Login
//    *
//    * @returns {JSX} JSX representation of component
//    */
//   render() {
//     const { error, auth } = this.props;
//     const { username, password, errors } = this.state;

//     if (auth) {
//       return <Redirect to="/" />;
//     }

//     return (
//       <div className="card border-0">
//         <div>
//           <small className="form-text login-label">
//             Welcome to Authors Haven
//           </small>
//         </div>
//         <div className="card-body">
//           {!isEmpty(error) && (
//             <ErrorAlertNotification
//               errors={error.message}
//               onClick={this.handleDelete}
//             />
//           )}
//           <form onSubmit={this.onSubmit}>
//             <div className="form-row">
//               <div className="form-group col-md-12">
//                 <TextField
//                   error={errors.username}
//                   label="username"
//                   onChange={this.onChange}
//                   value={username}
//                   placeholder="username"
//                   field="username"
//                   type="text"
//                   className="username"
//                 />
//               </div>
//               <div className="form-group col-md-12">
//                 <TextField
//                   error={errors.password}
//                   label="password"
//                   onChange={this.onChange}
//                   value={password}
//                   placeholder="password"
//                   field="password"
//                   type="password"
//                   className="password"
//                 />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group col-md-12">
//                 <button
//                   type="submit"
//                   className="btn login-btn submit"
//                   onClick={this.onSubmit}
//                 >
//                   SIGN IN
//                 </button>
//                 <div className="mt-4">
//                   <Link
//                     to={routes.RESET_PASSWORD}
//                     className="form-text text-danger"
//                     onClick={this.closeModal}
//                   >
//                     Forgot your password?
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <hr />
//             <div>
//               <small className="form-text">
//                 sign in with one of these services
//               </small>
//               <br />
//             </div>
//           </form>
//           <SocialLogin />
//         </div>
//       </div>
//     );
//   }
// }

// LoginForm.propTypes = {
//   auth: PropTypes.bool,
//   error: PropTypes.shape({}),
//   login: PropTypes.func.isRequired,
//   deleteErrorMessage: PropTypes.func,
//   hideModal: PropTypes.func,
//   userProfile: PropTypes.func
// };

// const mapStateToProps = state => ({
//   auth: state.auth.isAuthenticated,
//   error: state.auth.error
// });

// const mapDispatchToProps = dispatch => ({
//   login: user => dispatch(loginAction(user)),
//   deleteErrorMessage: () => dispatch(deleteErrorMessages()),
//   hideModal: () => dispatch(hideLoginModal()),
//   userProfile: username => dispatch(userProfileAction(username)),
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LoginForm);
