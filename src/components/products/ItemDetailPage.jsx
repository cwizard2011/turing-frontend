import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Loading from '../common/Loading';
import Footer from '../landing/Footer';
import { getSingeItem } from '../../actions/products.action';
import {
  showCartModal,
  showLoginModal,
  showSignupModal
} from '../../actions/modal.action';
import { addItemToCart } from '../../actions/cart.action';
import Modal from '../modals/Modals';
import DealItem from '../landing/DealItem';
import Header from '../navigation/Header';
import AddToCartButton from './AddToCartButton';
import config from '../../config';


/**
 * @class LandingPageBanner
 *
 * @param  {*} event
 */
export class ItemDetailPage extends Component {
  state = {
    color: 'Select color',
    size: 'Select size',
    quantity: 1,
    productId: null,
  };

  componentDidMount = () => {
    const {
      getSingleProduct, match
    } = this.props;
    const id = match.params.product_id;
    this.setState({
      productId: id
    });
    getSingleProduct(id);
  }

  /**
   *
   * @param {*} prevProps previous props
   * @param {*} prevState previous state
   *
   * @returns {*} item objects
   */
  componentDidUpdate(prevProps) {
    const {
      getSingleProduct, match
    } = this.props;
    if (prevProps.match.params.itemId !== match.params.itemId) {
      return getSingleProduct(match.params.itemId);
    }
  }

  handleColor = (event) => {
    event.preventDefault();
    this.setState({
      color: event.target.name
    });
  }

  handleSize = (event) => {
    event.preventDefault();
    this.setState({
      size: event.target.value
    });
  }

  handleMinus = (event) => {
    event.preventDefault();
    const { quantity } = this.state;
    const newState = quantity - 1;
    this.setState({
      quantity: newState
    });
  }

  handlePlus = (event) => {
    event.preventDefault();
    const { quantity } = this.state;
    const newState = quantity + 1;
    this.setState({
      quantity: newState
    });
  }

  handleAddToCart = (event) => {
    const {
      color, size, quantity, productId
    } = this.state;
    const { addToCart, showModal } = this.props;
    const attributes = [size, color];
    const itemData = { productId, quantity, attributes };
    event.preventDefault();
    addToCart(itemData).then(() => showModal());
  }

  /**
   * @description Render the JSX template
   *
   *
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const {
      items, modal, auth, showModalSignup, showModalLogin, history
    } = this.props;
    const { color, size, quantity } = this.state;
    if (items && !items.item) {
      return (
        <Loading />
      );
    }
    return (
      <React.Fragment>
        <Header history={history} />
        <div className="container shadow-lg d-flex justify-content-center mt-3 mb-3">
          <div className="row w-75 p-3 justify-content-center">
            <div className="col-md-6">
              <div className="card border-0">
                <div className="card-body">
                  <img
                    src={`${config.productUrl}/${items.item.image}`}
                    className="img-fluid mx-auto d-block"
                    alt="Item placeholder"
                  />
                </div>
                <div className="row justify-content-center mt-4 hidden">
                  <div className="col-md-3 card border-0 product-hover">
                    <img
                      src={`${config.productUrl}/${items.item.thumbnail}`}
                      className="img-fluid mx-auto d-block"
                      alt="Item placeholder"
                    />
                    <div className="middle">
                      <img
                        src={`${config.productUrl}/${items.item.image}`}
                        className="img-fluid mx-auto d-block"
                        alt="Item placeholder"
                      />
                    </div>
                  </div>
                  <div className="col-md-3 card border-0 product-hover">
                    <img
                      src={`${config.productUrl}/${items.item.thumbnail}`}
                      className="img-fluid mx-auto d-block product-hover"
                      alt="Item placeholder"
                    />
                    <div className="middle">
                      <img
                        src={`${config.productUrl}/${items.item.image}`}
                        className="img-fluid mx-auto d-block"
                        alt="Item placeholder"
                      />
                    </div>
                  </div>
                  <div className="col-md-3 card border-0 product-hover">
                    <img
                      src={`${config.productUrl}/${items.item.thumbnail}`}
                      className="img-fluid mx-auto d-block"
                      alt="Item placeholder"
                    />
                    <div className="middle">
                      <img
                        src={`${config.productUrl}/${items.item.image}`}
                        className="img-fluid mx-auto d-block"
                        alt="Item placeholder"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex flex-column">
              <div className="hidden">
                <ul className="navbar-nav mx-auto link-text d-flex flex-row">
                  <Link to="/" className="ash"><li className="nav-item mr-4">Home</li></Link>
                  <Link to="/items" className="ash">
                    <li className="nav-item mr-4">
                  All Categories
                    </li>
                  </Link>
                </ul>
              </div>
              <h2 className="d-flex mt-4">{items.item.name}</h2>
              <p className="text-justify">{items.item.description}</p>
              <h2 className="d-flex price font-weight-bold">
                $
                {items.item.price}
              </h2>
              <p>
                Color:
                {' '}
                {color !== null ? (
                  <span className="price">{color}</span>
                ) : ''}

              </p>
              <div className="d-flex flex-wrap">
                {items.item.AttributeValues.map((item) => {
                  if (item.attribute_id === 2) {
                    return (
                      <div key={item.attribute_value_id}>
                        <input
                          type="button"
                          className="dot attributes-color"
                          style={{ backgroundColor: item.value }}
                          onClick={this.handleColor}
                          name={item.value}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <p>
                Size:
                {' '}
                {size !== null ? (
                  <span className="price">{size}</span>
                ) : ''}

              </p>
              <div className="d-flex flex-wrap">
                {items.item.AttributeValues.map((item) => {
                  if (item.attribute_id === 1) {
                    return (
                      <p key={item.attribute_value_id}>
                        <input
                          className="attributes-size"
                          type="button"
                          onClick={this.handleSize}
                          value={item.value}
                        />
                        {' '}

                      </p>
                    );
                  }
                  return null;
                })}
              </div>

              <div>
                <p>Quantity</p>
                <input
                  type="button"
                  className="quantity"
                  onClick={this.handleMinus}
                  value="-"
                  disabled={
                        quantity === 1
                    }
                />
                <input
                  disabled
                  type="button"
                  className="quantity-view"
                  value={quantity}
                />
                <input
                  type="button"
                  className="quantity"
                  onClick={this.handlePlus}
                  value="+"
                  disabled={
                        quantity === 5
                    }
                />
              </div>
              {
                auth.isAuthenticated
                  ? (
                    <AddToCartButton
                      color={color}
                      size={size}
                      handleAddToCart={this.handleAddToCart}
                    />
                  )
                  : (
                    <span className="price mt-4">
                      <Link className="price" to="#" onClick={showModalLogin}>Login </Link>
                      <Modal modal={modal} />
                      or
                      {' '}
                      <Link className="price" to="#" onClick={showModalSignup}>Signup</Link>
                      {' '}
                      <Modal modal={modal} />
                      to add item to cart

                    </span>
                  )
              }
              <Modal modal={modal} itemName={items.item.name} />
            </div>
          </div>
        </div>
        <div className="container mb-3 hidden">
          <div className="row main-content">
            <div className="col-md-12 d-flex">
              <DealItem
                title="You may also like"
                mainRow="row card-body"
                innerColumn="col-md-2 d-flex"
              />
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

ItemDetailPage.propTypes = {
  showModalSignup: PropTypes.func,
  showModalLogin: PropTypes.func,
  department: PropTypes.shape({}),
  history: PropTypes.shape({}),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  items: PropTypes.shape({}),
  modal: PropTypes.shape({}),
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.string
    })
  }),
  addToCart: PropTypes.func,
  showModal: PropTypes.func,
  getSingleProduct: PropTypes.func,
  auth: PropTypes.shape({})
};

const mapStateToProps = state => ({
  auth: state.auth,
  items: state.product,
  modal: state.modal
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSingleProduct: getSingeItem,
  showModal: showCartModal,
  addToCart: addItemToCart,
  showModalLogin: showLoginModal,
  showModalSignup: showSignupModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailPage);
