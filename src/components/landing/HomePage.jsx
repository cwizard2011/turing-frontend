import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LandingPageBanner from './LandingPageBanner';
import ProductContainer from './ProductContainer';
import Footer from './Footer';
import Header from '../navigation/Header';


/**
 * @class LandingPage
 */
class HomePage extends Component {
  /**
   * @description Render the JSX template
   *
   * @memberof LoginModal
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const {
      history,
      match,
      department,
    } = this.props;
    return (
      <div>
        <Header />
        <LandingPageBanner />
        <ProductContainer history={history} match={match} department={department} />
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  department: PropTypes.shape({}),
  history: PropTypes.shape({}),
  match: PropTypes.shape({}),
  location: PropTypes.shape({}),
};
export default HomePage;
