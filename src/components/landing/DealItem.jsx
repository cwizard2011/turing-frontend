import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDeal } from '../../actions/products.action';
import Loading from '../common/Loading';

/**
 * @class LandingPageBanner
 */
class DealItem extends Component {
    componentDidMount = () => {
      const {
        listDealItem
      } = this.props;
      listDealItem();
    }

    /**
   * @description Render the JSX template
   *
   *
   *
   * @returns {JSX} JSX representation of component
   */
    render() {
      const {
        deal,
        title,
        mainRow,
        innerColumn
      } = this.props;
      if (deal && !deal.deal) {
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
          <div className="shadow-lg border-0 card p-3 p-lg-4">
            <div className="card-header product-header">
              <h3 className="product-header">{title}</h3>
            </div>
            <div className={mainRow}>
              {deal.deal.map(item => (
                (
                  <div className={innerColumn} key={item.id}>
                    <Link to={`/item/${item.id}`}>
                      <img
                        src={item.image}
                        className="img-fluid img-thumbnail mx-auto d-block"
                        alt="Item placeholder"
                      />
                      <div>
                        <p className="d-flex justify-content-center">
                          {item.name}
                        </p>
                        <span className="price d-flex justify-content-center">
                    $

                          {item.price}
                        </span>
                      </div>
                    </Link>
                  </div>
                )
              ))}
            </div>
          </div>
        </React.Fragment>
      );
    }
}

DealItem.propTypes = {
  listDealItem: PropTypes.func,
  deal: PropTypes.shape({}),
  title: PropTypes.string,
  mainRow: PropTypes.string,
  innerColumn: PropTypes.string,
};

const mapStateToProps = state => ({
  deal: state.deal,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  listDealItem: getDeal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DealItem);
