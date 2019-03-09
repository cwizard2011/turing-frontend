import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextField = ({
  field, value, error, type, onChange, id, placeholder, label, labelValue, classes
}) => (
  <div className={classnames({ 'text-danger': error })}>
    <label htmlFor={labelValue} className={classes}>{label}</label>
    <input
      className="form-control pl-3 custom"
      type={type}
      name={field}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
    />
    { error && <p className="text-danger">{error}</p>}
  </div>
);

TextField.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.instanceOf(Array),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.string,
  labelValue: PropTypes.string,
  classes: PropTypes.string,
};

export default TextField;
