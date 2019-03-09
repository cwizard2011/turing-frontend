import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../common/Loading';
import FeaturedCategories from './FeaturedCategories';
import DealOfDay from './DealOfDay';

/**
 * @class LandingPageBanner
 */
class ProductContainer extends Component {
  /**
   * @description Render the JSX template
   *
   *
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { department } = this.props;
    if (department && !department.department) {
      return (
        <div className="d-flex">
          <div className="row d-flex justify-content-center">
            <Loading />
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <FeaturedCategories department={department} />
        <DealOfDay title="Deal of the Day" />
        <div className="row">
          <div className="shadow-lg col-lg-12">
            <div className="card border-0 p-3 p-lg-4 discount-card-background">
              <div className="card-body d-flex flex-column">
                <h2 className="d-flex justify-content-center discount-heading">
                10% Discount on your first order
                </h2>
                <h3 className="d-flex justify-content-center">
                Shop for classic and quality Tshirts
                </h3>
                <h3 className="d-flex justify-content-center">
                We offer the best price you can never see anywhere
                </h3>
                <h3 className="d-flex justify-content-center">Want to place an order?</h3>
                <Link to="/items" className="d-flex justify-content-center">
                  <button type="button" className="register-button">Start Here</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ProductContainer.propTypes = {
  department: PropTypes.shape({}),
};

export default ProductContainer;
