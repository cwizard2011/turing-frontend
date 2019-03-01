import React, { Component } from 'react';
import Header from '../navigation/Header';
import LandingPageBanner from './LandingPageBanner';
import ProductContainer from './ProductContainer';
import Footer from './Footer';

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
    return (
      <div>
        <Header />
        <LandingPageBanner />
        <ProductContainer />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
