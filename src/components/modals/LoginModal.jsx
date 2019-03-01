import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../auth/LoginForm';
import { hideLoginModal } from '../../actions/modal.action';

/**
   * @class Modal
   */
export class LoginModal extends Component {
  closeModal = () => {
    const { hideModal } = this.props;
    hideModal();
  };

  /**
   * @description Render the JSX template
   *
   * @memberof LoginModal
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { show } = this.props;
    return (
      <div className="modal-content" style={{ display: !show ? 'none' : 'block' }}>
        <div className="modal-header card-title card-header">
          <h5 className="modal-title">SIGN IN</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            onClick={this.closeModal}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="container">
            <div className="row">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideLoginModal())
});

export default connect(null, mapDispatchToProps)(LoginModal);
