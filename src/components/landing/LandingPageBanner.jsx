import React, { Component } from 'react';

/**
 * @class LandingPageBanner
 */
class LandingPageBanner extends Component {
  /**
   * @description Render the JSX template
   *
   * @memberof LoginModal
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return (
      <React.Fragment>
        <div id="carouselIndicators" className="carousel" data-ride="carousel">
          <div className="d-flex flex-column" />
          <div className="carousel-inner">
            <h1 className="banner-item">Global Fashion</h1>
            <h3 className="banner-subitem">
            Reliable and Cheap Fashion product is just a click away
            </h3>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LandingPageBanner;
