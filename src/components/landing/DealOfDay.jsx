import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDeal } from '../../actions/products.action';
import Loading from '../common/Loading';
import DealItem from './DealItem';

/**
 * @class LandingPageBanner
 */
class DealOfDay extends Component {
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
      const { deal } = this.props;
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
          <div className="row main-content">
            <div className="col-md-12 d-flex">
              <DealItem
                title="Deal of the Day"
                mainRow="row card-body"
                innerColumn="col-md-2 d-flex flex-grow-1"
              />
            </div>
          </div>
        </React.Fragment>
      );
    }
}

DealOfDay.propTypes = {
  listDealItem: PropTypes.func,
  deal: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  deal: state.deal,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  listDealItem: getDeal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DealOfDay);
