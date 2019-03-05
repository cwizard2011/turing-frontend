import React from 'react';
import PropTypes from 'prop-types';

const AddToCartButton = ({ handleAddToCart, color, size }) => (
  <div>
    <button
      type="button"
      className="register-button mt-4"
      onClick={handleAddToCart}
      disabled={
          color === null
          || color === 'Select color'
          || size === null
          || size === 'Select size'
      }
    >
        Add to cart
    </button>
  </div>
);

AddToCartButton.propTypes = {
  handleAddToCart: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.string
};

export default AddToCartButton;
