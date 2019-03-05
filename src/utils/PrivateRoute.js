import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  auth,
  ...rest
}) => {
  if (!auth) {
    return toastr.error('Please login');
  }
  return (
    <Route
      {...rest}
      render={
      props => (auth
        ? <Component {...props} />
        : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ))
    }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.bool,
  component: PropTypes.func,
  location: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(PrivateRoute);
