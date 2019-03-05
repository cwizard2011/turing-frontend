import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { hideCartModal } from '../../actions/modal.action';

/**
   * @class Modal
   */
export class AddToCartModal extends Component {
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
    const { show, itemName } = this.props;
    return (
      <div className="modal-content" style={{ display: !show ? 'none' : 'block' }}>
        <div className="modal-header card-title card-header">
          <h2 className="modal-title">Success!</h2>
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
              <h3>
                {itemName}
                {' '}
            added to cart
              </h3>
              <div className="d-flex p-2 flex-row justify-content-center mx-auto">
                <Link to="/items">
                  <button
                    type="button"
                    className="register-button continue-shopping mr-2"
                    onClick={this.closeModal}
                  >
                  CONTINUE
                  </button>
                </Link>
                <Link to="/cart">
                  <button
                    type="button"
                    className="register-button checkout ml-2"
                    onClick={this.closeModal}
                  >
                CHECKOUT

                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddToCartModal.propTypes = {
  hideModal: PropTypes.func,
  show: PropTypes.bool,
  itemName: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideCartModal())
});

export default connect(null, mapDispatchToProps)(AddToCartModal);
