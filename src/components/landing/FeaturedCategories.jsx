import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../common/Loading';
import config from '../../config';


/**
 * @class FeaturedCategories
 */
export class FeaturedCategories extends Component {
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
          <Loading />
      );
    }
    return (
      <React.Fragment>
        <div className="row main-content">
          <div className="col-md-12 card-group">
            <div className="shadow-lg border-0 card p-3 p-lg-4">
              <div className="card-header">
                <h3>Featured Categories</h3>
              </div>
              <div className="row card-body categories container">
                {department.department.map(items => items.Categories.map(category => (
                  (
                    <div className="col-md-2 d-flex justify-content-sm-around" key={category.category_id}>
                      <Link to={`/products/${items.name}/${category.name}`}>
                        <img
                          src={`${config.productUrl}/${category.Products[1].image}`}
                          className="img-fluid img-thumbnail mx-auto d-block"
                          alt=""
                        />
                        <p className="d-flex justify-content-center">
                          {category.name}
                        </p>
                      </Link>
                    </div>
                  )
                )))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

FeaturedCategories.propTypes = {
  department: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  department: state.department,
});

export default connect(mapStateToProps, null)(FeaturedCategories);
