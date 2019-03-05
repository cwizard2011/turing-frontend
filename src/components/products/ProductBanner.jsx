import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Loading from '../common/Loading';

/**
 * @class LandingPageBanner
 */
class ProductPageBanner extends Component {
  /**
   * @description Render the JSX template
   *
   * @memberof LoginModal
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { products, location } = this.props;
    let itemDepartment;
    let itemCategory;
    if (location && location.search) {
      const parsed = queryString.parse(location.search);
      itemCategory = parsed.category;
      itemDepartment = parsed.department;
    }
    if (
      itemCategory !== undefined
      && itemDepartment !== undefined
      && products.items
      && products.items[0]
      && !products.items[0].Categories) {
      return (
        <div className="d-flex">
          <div className="row d-flex align-item-center">
            <Loading />
          </div>
        </div>
      );
    }
    return (
      <div>
        <div>
          <div className="jumbotron jumbotron-background">
            <h1 className="white">
              {itemCategory !== undefined && itemDepartment !== undefined ? (
                `${itemDepartment} >> ${itemCategory}`
              ) : 'All Categories'}
            </h1>
            <p className="white">
              {itemCategory !== undefined && itemDepartment !== undefined
                ? products.items[0].Categories[0].description
                : 'We offer the best product at a competitive price, a trial will convince you'}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ProductPageBanner.propTypes = {
  history: PropTypes.shape({}),
  location: PropTypes.shape({}),
  products: PropTypes.shape({})
};

export default ProductPageBanner;
