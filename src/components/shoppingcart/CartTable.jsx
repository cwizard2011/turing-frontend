import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../navigation/Header';
import Footer from '../landing/Footer';
import DealItem from '../landing/DealItem';
import { getCartItem, updateCartQuantity, deleteCart } from '../../actions/cart.action';
import Loading from '../common/Loading';
import CheckoutModal from '../modals/CheckoutModal';
import { showCheckoutModal } from '../../actions/modal.action';

/**
 * @description Shopping Cart
 *
 * @returns {*} jsx
 * @param {*} event event object
 *
 */
class CartTable extends Component {
    state = {
      userCart: null,
      update: false,
      remove: false,
    }

    componentDidMount = () => {
      const { getUserCart } = this.props;
      getUserCart().then(res => (
        this.setState({
          userCart: res.data
        })
      ));
    }

    /**
     *
     * @param {*} prevProps previous props
    * @param {*} prevState previous state
    * @returns {*} Updated cart object
    */
    componentDidUpdate = (prevProps, prevState) => {
      const { update, remove } = prevState;
      const { getUserCart } = this.props;
      if (update !== this.state.update) { // eslint-disable-line
        getUserCart().then((res) => {
          this.setState({
            userCart: res.data,
            update: false
          });
        });
      }
      if (remove !== this.state.remove) { // eslint-disable-line
        getUserCart().then((res) => {
          this.setState({
            userCart: res.data,
            remove: false
          });
        });
      }
    }

    handleQuantityChange = (event) => {
      const { updateCart } = this.props;
      const { name } = event.target;
      const { value } = event.target;
      updateCart(name, value);
      return this.setState({
        update: true
      });
    }

    handleCartDelete = (event) => {
      event.persist();
      const { deleteCartItem } = this.props;
      const { name } = event.target;
      deleteCartItem(name);
      return this.setState({
        remove: true
      });
    }

    /**
     * @description render cart table
     *
     * @return {*} jsx
     */
    render() {
      const { userCart } = this.state;
      if (userCart === null) {
        return (
          <div className="d-flex">
            <div className="row d-flex justify-content-center">
              <Loading />
            </div>
          </div>
        );
      }
      return (
        <div>
          <Header />
          {userCart.totalItems > 0 ? (
            <div className="container mb-4 mt-5">
              <h3 className="mx-auto">
                {userCart.items.count}
                {' '}
                {userCart.items.count > 1 ? 'items in your cart' : 'item in your cart'}
              </h3>
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" />
                          <th scope="col">Item</th>
                          <th scope="col">Attributes</th>
                          <th scope="col">Quantity</th>
                          <th scope="col" className="text-right">Unit Price</th>
                          <th scope="col" className="text-right">Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userCart.items.rows.map(item => (
                          (
                            <tr key={item.id}>
                              <td>
                                <img src={item.Product.image} alt="Product" />
                                {' '}
                              </td>
                              <td>
                                <Link className="hover-blue" to={`/item/${item.Product.id}`}>
                                  <p>
                                    {item.Product.name}
                                  </p>
                                </Link>
                                <p>
                                  <input
                                    name={item.id}
                                    type="submit"
                                    value="X Remove"
                                    className="btn btn-light delete red"
                                    onClick={this.handleCartDelete}
                                  />
                                </p>

                              </td>
                              <td>{item.attribute}</td>
                              <td>
                                <div className="form-group">
                                  <select
                                    className="form-control"
                                    name={item.id}
                                    id="exampleSelect1"
                                    value={item.quantity}
                                    onChange={this.handleQuantityChange}
                                  >
                                    <option defaultValue />
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </div>

                              </td>
                              <td className="text-right">
                                $
                                {item.Product.price}
                              </td>
                              <td className="text-right">
                                $
                                {parseFloat(
                                  Math.round((item.quantity * item.Product.price) * 100) / 100
                                ).toFixed(2)}
                              </td>
                            </tr>
                          )
                        ))}
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td>Sub-Total</td>
                          <td className="text-right">
                            $
                            {parseFloat(Math.round(userCart.subTotal * 100) / 100).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td>Total Discount</td>
                          <td className="text-right">
                            $
                            {parseFloat(Math.round(userCart.totalDiscount * 100) / 100).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td>Total Cost</td>
                          <td className="text-right">
                            $
                            {parseFloat(Math.round(userCart.finalPrice * 100) / 100).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td colSpan="2">Excluding shipping charge</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col mb-2 grey-background pt-3 pb-3">
                  <div className="col mb-2">
                    <div className="row">
                      <div className="col-sm-6  col-md-6">
                        <Link to="/items">
                          <button
                            type="button"
                            className="btn btn-block continue-shopping"
                          >
                    Continue Shopping

                          </button>
                        </Link>
                      </div>
                      <div className="col-sm-6 col-md-6">
                        <button
                          data-toggle="modal"
                          data-target="#exampleModalLong"
                          type="button"
                          className="btn btn-block text-uppercase checkout"
                        >
                    Checkout
                        </button>
                        <CheckoutModal />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container mb-3">
              <div className="row main-content">
                <h3 className="mx-auto">{userCart.message}</h3>
              </div>
              <div className="container mb-3 hide-desktop">
                <div className="row main-content">
                  <div className="col-md-12 d-flex">
                    <DealItem
                      title="These items are specially selected for you"
                      mainRow="row card-body"
                      innerColumn="col-md-2 d-flex"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="container mb-3 hidden">
            <div className="row main-content">
              <div className="col-md-12 d-flex">
                <DealItem
                  title="These items are specially selected for you"
                  mainRow="row card-body"
                  innerColumn="col-md-2 d-flex"
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
}

CartTable.propTypes = {
  getUserCart: PropTypes.func,
  updateCart: PropTypes.func,
  deleteCartItem: PropTypes.func,
  modal: PropTypes.shape({}),
  cart: PropTypes.shape({})
};

const mapStateToProps = state => ({
  cart: state.cart,
  modal: state.modal
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserCart: getCartItem,
  updateCart: updateCartQuantity,
  deleteCartItem: deleteCart,
  showModal: showCheckoutModal,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(CartTable);
