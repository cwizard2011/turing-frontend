import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import AddToCartModal from './AddToCartModal';

/**
   * @class Modal
   */
export class Modal extends Component {
  /**
   * @description Render the JSX template
   *
   * @memberof LoginModal
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { modal, history, itemName } = this.props;

    return (
      <div
        className="modal"
        id="myModal"
        style={{ display: modal.current === null ? 'none' : 'block' }}
      >
        <div className="modal-overlay" />
        <div className="modal-dialog modal-dialog-centered">
          {modal.current === 'signup'
          && <SignupModal show={modal.current === 'signup'} history={history} />}
          {modal.current === 'login'
          && <LoginModal show={modal.current === 'login'} history={history} />}
          {modal.current === 'cart'
          && <AddToCartModal show={modal.current === 'cart'} itemName={itemName} />}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modal: PropTypes.shape({}),
  history: PropTypes.shape({}),
  itemName: PropTypes.string
};

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(mapStateToProps, null)(Modal);
