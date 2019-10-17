import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
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
      <React.Fragment>
        <Helmet>
          <title>Tshirt Shop</title>
          <meta name="description"
            content="order tshirts, buy quality tshirts, cheap and high quality tshirt"
          />
          <meta name="keywords" content="tshirt, shirt, vest, polo" />
        </Helmet>
        <Header history={history} />
        <LandingPageBanner />
        <ProductContainer history={history} match={match} department={department} />
        <Footer />
      </React.Fragment>
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
