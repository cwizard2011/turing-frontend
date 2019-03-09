import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '../common/TextField';
import ErrorAlertNotification from '../common/ErrorAlertNotification';


/**
 * @class DeliveryInfoForm
 * @param {*} event
 */
export class DeliveryInfoForm extends Component {
  handleDelete = () => {
    const { deleteError } = this.props;
    deleteError();
  }

  /**
   *
   * @param {*} event
   * @returns {*} - state
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
      zipCode,
      handleDelete,
      handleCountryChange,
      handleShippingRegionChange,
      error,
      handleOnChange,
      handleShippingIdChange
    } = this.props;

    const form = (
      <div className="card">
        <div className="card-body px-auto">
          {
                (error && error.message) ? (
                  <ErrorAlertNotification
                    errors={error.message}
                    onClick={handleDelete}
                  />
                ) : ''
              }
          <form>
            <div className="form-row">
              <div className="form-group col-md-6 custom">
                <TextField
                  classes="col-form-label"
                  label="Full Name"
                  labelValue="fullname"
                  error={errors.fullname}
                  onChange={handleOnChange}
                  value={fullname}
                  placeholder="Fullname"
                  field="fullname"
                  className="fullname"
                  required
                />
              </div>
              <div className="form-group col-md-6 custom">
                <TextField
                  classes="col-form-label"
                  label="Address 1"
                  labelValue="address1"
                  error={errors.address1}
                  onChange={handleOnChange}
                  value={address1}
                  placeholder="Address 1"
                  field="address1"
                  className="myaddress"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6 custom">
                <TextField
                  label="Address 2"
                  labelValue="address2"
                  error={errors.address2}
                  onChange={handleOnChange}
                  value={address2}
                  placeholder="Address 2"
                  field="address2"
                  className="myaddress2"
                />
              </div>
              <div className="form-group col-md-6 custom">
                <TextField
                  classes="col-form-label"
                  label="City"
                  labelValue="city"
                  error={errors.city}
                  onChange={handleOnChange}
                  value={city}
                  placeholder="City"
                  field="city"
                  className="mycity"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6 custom">
                <TextField
                  label="State"
                  labelValue="state"
                  error={errors.state}
                  onChange={handleOnChange}
                  value={states}
                  placeholder="State"
                  field="state"
                  className="mystate"
                />
              </div>
              <div className="form-group col-md-6 custom">
                <TextField
                  classes="col-form-label"
                  label="Zip Code"
                  labelValue="zipcode"
                  error={errors.zipCode}
                  onChange={handleOnChange}
                  value={zipCode}
                  placeholder="Zip Code"
                  field="zipCode"
                  className="myZip"
                />
              </div>
            </div>
            {(country === null
            && shippingRegionId !== 1)
            || (country !== null && shippingRegionId === 1)
            || (country === null && shippingRegionId === 1) ? (
              <div className="form-row">
                <div className="form-group col-md-6 custom">
                  <select
                    className="form-control"
                    id="exampleSelect2"
                    value={country}
                    onChange={handleCountryChange}
                  >
                    <option>Select a country</option>
                    {countryList !== null ? countryList.map(listcountry => (
                      <option key={listcountry}>{listcountry}</option>
                    )) : ''}
                  </select>
                </div>
                <div className="form-group col-md-6 custom">
                  <select
                    className="form-control"
                    id="exampleSelect3"
                    value={shippingRegion}
                    onChange={handleShippingRegionChange}
                  >
                    {regions !== null ? regions.map(region => (
                      (
                        <option key={region.id} value={region.id}>{region.shipping_region}</option>
                      )
                    )) : ''}
                  </select>
                </div>
              </div>
              ) : (
                <div className="form-row">
                  <div>
                  Country:
                    {' '}
                    <span className="font-weight-bold">{country}</span>
                    {' '}
                  </div>
                  <hr />
                  <div className="text-left mt-4">
                    <h3 className="col-form-label">Delivery options</h3>
                    {shippings && shippings.length > 0 ? shippings.map(shipping => (
                      <div key={shipping.id} className="form-check form-check-inline mt-2 ml-4">
                        <input
                          className="form-check-input mx-auto ml-2 mr-4"
                          onChange={handleShippingIdChange}
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1" value={shipping.id}
                        />
                        <label
                          className="form-check-label ml-2"
                          htmlFor="inlineRadio1"
                        >
                          {shipping.shipping_type}
                        </label>
                      </div>
                    )) : ''}
                  </div>
                </div>
              )}
          </form>
          <hr />
        </div>
      </div>
    );
    return (
      <div>
        {form}
      </div>
    );
  }
}

DeliveryInfoForm.propTypes = {
  deleteError: PropTypes.func,
  error: PropTypes.shape({}),
  history: PropTypes.shape({}),
  regions: PropTypes.shape([]),
  countryList: PropTypes.shape([]),
  errors: PropTypes.shape({}),
  fullname: PropTypes.string,
  address1: PropTypes.string,
  address2: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  shippingRegionId: PropTypes.string,
  shippingRegion: PropTypes.string,
  states: PropTypes.string,
  shippings: PropTypes.string,
  zipCode: PropTypes.string,
  handleDelete: PropTypes.func,
  handleCountryChange: PropTypes.func,
  handleShippingRegionChange: PropTypes.func,
  handleOnChange: PropTypes.func,
  handleShippingIdChange: PropTypes.func
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, null)((DeliveryInfoForm));
