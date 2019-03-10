import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import PropTypes from 'prop-types';

/**
 * @class Payments
 */
class Payments extends Component {
  /**
     * @returns {*} jsx
     */
  render() {
    const {
      cart, shippingId, shippings, onToken
    } = this.props;
    let shippingCost;
    let totalPrice;
    let grandTotal;

    if (shippingId !== '' && cart && cart.finalPrice) {
      totalPrice = cart.finalPrice;
      shippings.map((shipping) => {
        if (shipping.id === parseFloat(shippingId)) {
          shippingCost = parseFloat(shipping.shipping_cost);
        }
        return null;
      });
      grandTotal = Math.round((((totalPrice + shippingCost) * 100)));
    }
    return (
      <StripeCheckout
        name="Tshirt Shop"
        description="Payment for order on Tshirt shop App"
        amount={grandTotal}
        token={token => onToken(token)}
        stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
      >
        <button
          type="button"
          className="register-button mt-4 d-flex justify-content-center text pay-now"
        >
                Make Payment
        </button>
      </StripeCheckout>
    );
  }
}

Payments.propTypes = {
  cart: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  shippingId: PropTypes.string,
  error: PropTypes.shape({}),
  shippings: PropTypes.shape({}),
  onToken: PropTypes.func,
};

export default Payments;
