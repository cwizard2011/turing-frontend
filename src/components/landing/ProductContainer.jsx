import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * @class LandingPageBanner
 */
class ProductContainer extends Component {
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
        <div className="row main-content">
          <div className="col-md-12">
            <div className="shadow-lg border-0 card p-3 p-lg-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <p>Product Image here</p>
                  </div>
                  <div className="col-md-7">
                    <p>Description here With supporting text below as a natural lead-in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row main-content">
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">
                <div className="shadow-lg border-0 card p-3 p-lg-4">
                  <div className="card-body">
                    <h3>Special title treatment 1</h3>
                    <p>With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
              <div className="col-md-11 main-content">
                <div className="row">
                  <div className="shadow-lg border-0 card p-3 p-lg-4">
                    <div className="card-body">
                      <h3>Special title treatment 2</h3>
                      <p>With supporting text below as a natural lead-in to additional content.</p>
                      <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 ">
            <div className="shadow-lg border-0 card p-3 p-lg-4">
              <div className="card-body max-height">
                <h3>Special title treatment 3</h3>
                <p>With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
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
                <Link to="/" className="d-flex justify-content-center">
                  <button type="button" className="register-button">Start Here</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductContainer;
