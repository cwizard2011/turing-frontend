import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * @class OrderSummary
 */
export default class OrderSummary extends Component {
  /**
     * @returns {*} jsx
     */
  render() {
    const {
      cart, address1, shippingId, shippings, city, state, country, zipCode
    } = this.props;
    let shippingCost;
    let deliveryOption;

    if (shippingId !== '') {
      shippings.map((shipping) => {
        if (shipping.id === parseFloat(shippingId)) {
          shippingCost = parseFloat(shipping.shipping_cost);
          deliveryOption = shipping.shipping_type;
        }
        return null;
      });
    }
    return (
      <div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h3>Order Summary</h3>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Items</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    cart && cart.items ? (
                      cart.items.rows.map(item => (
                        (
                          <tr key={item.id}>
                            <td>{item.Product.name}</td>
                            <td>{item.quantity}</td>
                            <td>
                            $
                              {item.quantity * item.Product.price}
                            </td>
                          </tr>
                        )
                      ))
                    ) : 'Loading....'
                        }
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <h2>Delivery</h2>
            <h3>Address</h3>
            <p>
              {address1}
              {' '}
              {city}
              {' '}
              {state}
              {' '}
              {country}
              {' '}
              {zipCode}
            .
            </p>
            <hr />

            <h3>Delivery Option</h3>
            <p>{deliveryOption}</p>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="row mb-4">
          <div className="col-md-3">
            <p className="font-weight-bold">
              {cart && cart.totalDiscount ? (
                <span>
            Discount: $
                  {cart.totalDiscount}
                </span>
              ) : ''}

            </p>
          </div>
          <div className="col-md-3">
            <p className="font-weight-bold">
              {cart && cart.subTotal ? (
                <span>
            SubTotal: $
                  {cart.subTotal}
                </span>
              ) : ''}

            </p>
          </div>
          <div className="col-md-3">
            <p className="font-weight-bold">
              <span>
            Shipping cost:
                {shippingCost !== undefined ? (
                  <span>
                $
                    {shippingCost}
                  </span>
                ) : 0}
              </span>
            </p>
          </div>
          <div className="col-md-3">
            <p>
            Grand Total: $
              {shippingCost !== undefined ? (
                <span>
                  {Math.round(((
                    cart.subTotal + shippingCost - cart.totalDiscount) * 100) / 100).toFixed(2)}

                </span>
              ) : (
                <span>{cart.finalPrice}</span>
              )}

            </p>
          </div>
        </div>
      </div>
    );
  }
}

OrderSummary.propTypes = {
  cart: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  address1: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  shippings: PropTypes.string,
  zipCode: PropTypes.string,
  shippingId: PropTypes.string,
  error: PropTypes.shape({}),
  state: PropTypes.string
};
