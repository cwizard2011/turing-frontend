import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeliveryInfoForm from './DeliveryInfoForm';
import OrderSummary from './OrderSummary';
import Loading from '../common/Loading';

const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  stepIcon: {
    color: '#F62F5E'
  },
});


/**
 * @class CheckoutStepper
 * @param {*} stepIndex
 * @param {*} event
 * @param {*} step
 *
 */
class CheckoutStepper extends React.Component {
  state = {
    activeStep: 0,
    error: '',
    isLoading: false,
  }

  getSteps = () => ['Delivery', 'Confirmation', 'Payment', 'Finish']

  getStepContent = (stepIndex) => {
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
      cart,
      handleDelete,
      handleCountryChange,
      handleShippingRegionChange,
      handleOnChange,
      handleShippingIdChange
    } = this.props;
    switch (stepIndex) {
      case 0:
        return (
          <DeliveryInfoForm
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
            handleDelete={handleDelete}
            handleCountryChange={handleCountryChange}
            handleShippingRegionChange={handleShippingRegionChange}
            error={error}
            handleOnChange={handleOnChange}
            handleShippingIdChange={handleShippingIdChange}
          />

        );
      case 1:
        return (
          <OrderSummary
            cart={cart}
            address1={address1}
            city={city}
            states={states}
            country={country}
            zipCode={zipCode}
            shippingId={shippingId}
            shippings={shippings}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  handleNext = () => {
    const {
      fullname, address1, address2, city, shippingId, updateProfile, zipCode
    } = this.props;
    const { activeStep } = this.state;
    if (fullname === '' || address1 === '' || city === '' || shippingId === '') {
      return this.setState({
        error: 'You need to complete all the required field'
      });
    } else {
      if (activeStep === 0) {
        const update = {
          fullname,
          address1,
          address2,
          city,
          postalCode: zipCode
        };
        this.setState({ isLoading: true });
        return updateProfile(update).then(() => this.setState(state => ({
          isLoading: false,
          error: '',
          activeStep: state.activeStep + 1,
        })));
      }
      this.setState(state => ({
        activeStep: state.activeStep + 1,
        error: ''
      }));
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  /**
   * @returns {*} returns jsx
   */
  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep, error, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="d-flex">
          <div className="row d-flex justify-content-center">
            <Loading />
          </div>
        </div>
      );
    }
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}
              classes={{
                root: classes.step,
              }}
            >
              <StepLabel
                StepIconProps={{
                  classes: { root: classes.stepIcon }
                }}
              >
                {label}

              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div style={{ color: '#F62F5E' }}>{error}</div>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography
                className={classes.instructions}
              >
                {this.getStepContent(activeStep)}
              </Typography>
              <div className="d-flex p-2 justify-content-around">
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  style={{
                    color: '#F62F5E', backgroundColor: '#F7F7F7', 'border-radius': '20px', padding: '8px 16px', width: '120px' // eslint-disable-line
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  style={{
                    color: '#F7F7F7', backgroundColor: '#F62F5E', 'border-radius': '20px', padding: '8px 16px', width: '120px' // eslint-disable-line
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

CheckoutStepper.propTypes = {
  classes: PropTypes.shape({}),
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
  shippingId: PropTypes.string,
  error: PropTypes.shape({}),
  cart: PropTypes.shape({}),
  handleDelete: PropTypes.func,
  handleCountryChange: PropTypes.func,
  handleShippingRegionChange: PropTypes.func,
  handleOnChange: PropTypes.func,
  handleShippingIdChange: PropTypes.func,
  updateProfile: PropTypes.func
};

export default withStyles(styles)(CheckoutStepper);
