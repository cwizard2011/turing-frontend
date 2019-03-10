import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CheckoutStepper from '../shoppingcart/CheckoutStepper';
import SignUpInputValidation from '../../validations/SignUpInputValidate';
import {
  getUserProfile,
  getCountryList,
  getRegionList,
  updateUserProfile
} from '../../actions/profile.action';
import { checkout } from '../../actions/cart.action';

/**
   * @class Modal
   * @param {*} event - form event
   */
export class CheckoutModal extends React.Component {
  state = {
    regions: null,
    countryList: null,
    fullname: '',
    address1: '',
    address2: '',
    city: '',
    states: '',
    zipCode: '',
    country: '',
    shippingId: '',
    shippingType: '',
    shippingRegionId: '',
    shippings: null,
    errors: {},
    error: {},
    update: false,
    payed: false,
  };

  componentDidMount = () => {
    const { getUserInfo, getCountries, getRegions } = this.props;
    return getUserInfo().then((res) => {
      this.setState({
        fullname: res.data.user.name,
        address1: res.data.user.address_1,
        address2: res.data.user.address_2,
        city: res.data.user.city,
        states: res.data.user.state,
        zipCode: res.data.user.postal_code,
        country: res.data.user.country,
        shippingRegionId: res.data.user.shipping_region_id,
        shippings: res.data.user.ShippingRegion.Shippings,
      });
      if (res.data.user.country === null || res.data.user.ShippingRegion.Shippings.length < 1) {
        getCountries().then(res => (
          this.setState({
            countryList: res.data,
          })
        ));
        getRegions().then(res => (
          this.setState({
            regions: res.data.response.rows
          })
        ));
      }
    });
  }

  /**
     *
     * @param {*} prevProps previous props
    * @param {*} prevState previous state
    * @returns {*} Updated cart object
    */
   componentDidUpdate = (prevProps, prevState) => {
     const { update } = prevState;
     const { getUserInfo } = this.props;
   if (update !== this.state.update) { // eslint-disable-line
       getUserInfo().then((res) => {
         this.setState({
           shippings: res.data.user.ShippingRegion.Shippings,
           update: false
         });
       });
     }
   }

  handleShippingRegionChange = (event) => {
    event.persist();
    const { updateProfile } = this.props;
    const update = {
      shippingRegionId: event.target.value,
    };
    return updateProfile(update).then(() => this.setState({
      update: true,
      shippingRegionId: event.target.value
    }));
  }

  handleCountryChange = (event) => {
    event.persist();
    const { updateProfile } = this.props;
    this.setState({
      country: event.target.value
    });
    const update = {
      country: event.target.value
    };
    return updateProfile(update).then(() => this.setState({
      update: true
    }));
  }

  handleShippingIdChange = (event) => {
    event.persist();
    this.setState({
      shippingId: event.target.value
    });
  }

  /**
   *
   * @param {*} event
   * @returns {*} - state
   */
  handleOnChange = (event) => {
    const { errors } = this.state;
    if (errors[event.target.name]) {
      const error = Object.assign({}, errors);
      delete errors[event.target.name];
      this.setState({
        [event.target.name]: event.target.value, error
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value

      });
    }
  }

  /**
   * @param {*} token
   * @returns {*} jsx
   */
  onToken = (token) => {
    const { handleToken } = this.props;
    const { shippingId } = this.state;
    this.setState({
      payed: true,
    });
    const body = {
      shippingId,
      stripeToken: token.id,
      stripeEmail: token.email
    };
    handleToken(body).then(() => {

    });
  }

  closeModal = () => {
    const { hideModalCheckout } = this.props;
    hideModalCheckout();
  }

  /**
   * isValid
   * @returns {*} - state
   */
  isValid() {
    const { errors, isValid } = SignUpInputValidation.InputValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * @description Render the JSX template
   *
   * @memberof LoginModal
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const {
      regions,
      countryList,
      errors,
      fullname,
      address1,
      address2,
      city,
      country,
      shippingRegionId,
      shippingRegion,
      states,
      shippings,
      shippingId,
      zipCode,
      error,
      payed
    } = this.state;
    const { cart, updateProfile } = this.props;
    return (
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
        style={{ overlay: { backgroundColor: 'rgba(0,0,0,0)' } }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header card-title card-header">
              <h2 className="modal-title" id="exampleModalLongTitle">Checkout</h2>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <CheckoutStepper
                regions={regions}
                countryList={countryList}
                errors={errors}
                fullname={fullname}
                address1={address1}
                address2={address2}
                city={city}
                country={country}
                shippingRegionId={shippingRegionId}
                shippingRegion={shippingRegion}
                states={states}
                shippings={shippings}
                zipCode={zipCode}
                handleDelete={this.handleDelete}
                handleCountryChange={this.handleCountryChange}
                handleShippingRegionChange={this.handleShippingRegionChange}
                error={error}
                handleOnChange={this.handleOnChange}
                handleShippingIdChange={this.handleShippingIdChange}
                updateProfile={updateProfile}
                cart={cart}
                shippingId={shippingId}
                onToken={this.onToken}
                payed={payed}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CheckoutModal.propTypes = {
  hideModalCheckout: PropTypes.func,
  getUserInfo: PropTypes.func,
  getCountries: PropTypes.func,
  getRegions: PropTypes.func,
  updateProfile: PropTypes.func,
  handleToken: PropTypes.func,
  cart: PropTypes.shape({})
};

const mapStateToProps = state => ({
  cart: state.cart.cart
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserInfo: getUserProfile,
  getCountries: getCountryList,
  getRegions: getRegionList,
  updateProfile: updateUserProfile,
  handleToken: checkout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModal);
