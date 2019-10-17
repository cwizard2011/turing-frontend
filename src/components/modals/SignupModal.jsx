import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SignupForm from '../auth/SignUpForm';
import { hideSignupModal } from '../../actions/modal.action';

/**
   * @class Modal
   */
export class SignUpModal extends React.Component {
  closeModal = () => {
    const { hideModalSignup } = this.props;
    hideModalSignup();
  }

  /**
   * @description Render the JSX template
   *
   * @memberof LoginModal
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { show, history } = this.props;
    return (
      <div className="modal-content" style={{ display: !show ? 'none' : 'block' }}>
        <div className="modal-header card-title card-header">
          <h2 className="modal-title card-title">SIGN UP</h2>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            onClick={this.closeModal}
          >
            &times;
          </button>
        </div>
        <SignupForm history={history} />
      </div>
    );
  }
}

SignUpModal.propTypes = {
  hideModalSignup: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  hideModalSignup: hideSignupModal
}, dispatch);

export default connect(null, mapDispatchToProps)(SignUpModal);
