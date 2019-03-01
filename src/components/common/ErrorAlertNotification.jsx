import React from 'react';
import PropTypes from 'prop-types';

/**
   * Error alert notification
   * @param {*} props - Response object
   * @returns {*} props.errors - with props.errors
   */
const ErrorAlertNotification = (props) => {
  const { errors } = props;
  return (
    <div className="alert alert-danger fade show" role="alert">
      <button type="button" className="close" onClick={() => props.onClick()}>
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>{errors}</strong>
    </div>
  );
};

ErrorAlertNotification.propTypes = {
  errors: PropTypes.string,
  onClick: PropTypes.func
};

export default ErrorAlertNotification;
