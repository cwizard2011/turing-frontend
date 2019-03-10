import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

/**
 * @class OrderConfirmation
 */
export default class OrderConfirmation extends Component {
  state = {
    updated: false,
  }

  onChange = () => {
    this.setState({ updated: true });
  }

  /**
     * @returns {*} jsx
     */
  render() {
    const { updated } = this.state;
    if (updated === true) {
      return <Redirect to="/items" />;
    }
    return (
      <div className="mt-4 mb-4 mx-auto text-center">
        <img
          src="https://res.cloudinary.com/cwizard/image/upload/v1552252411/Turing/iconfinder_Checkmark_1891021.png" // eslint-disable-line
          alt="Success"
        />
        <h1>Success!</h1>
        <p className="text-center">
        Your item will be shipped shortly, check your inbox or spam for confirmation email
        </p>
        <button
          type="button"
          onClick={this.onChange}
          data-dismiss="modal"
          className="register-button checkout ml-2"
        >
                Back to shop

        </button>
      </div>
    );
  }
}
