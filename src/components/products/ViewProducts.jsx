import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { getItems } from '../../actions/products.action';
import ProductBanner from './ProductBanner';
import Loading from '../common/Loading';
import Header from '../navigation/Header';
import DealItem from '../landing/DealItem';
import Footer from '../landing/Footer';
import config from '../../config';


/**
 * @class LandingPageBanner
 */
export class ViewProducts extends Component {
  state = {
    itemPage: 1,
    totalCount: null,
    pageLimit: null
  };

  componentDidMount = () => {
    const {
      location, getProducts
    } = this.props;
    const { itemPage } = this.state;
    const locationPath = location.pathname.split('/');
    if (location.search) {
      const parsed = queryString.parse(location.search);
      const stringified = queryString.stringify(parsed);
      return getProducts(stringified).then((res) => {
        this.setState({
          itemPage: res.data.paginationMeta.currentPage,
          totalCount: res.data.paginationMeta.totalCount,
          pageLimit: res.data.paginationMeta.pageSize
        });
      });
    } if (locationPath.length > 2) {
      const dept = locationPath[2];
      const cate = locationPath[3];
      return getProducts(`department=${dept}&category=${cate}`).then((res) => {
        this.setState({
          itemPage: res.data.paginationMeta.currentPage,
          totalCount: res.data.paginationMeta.totalCount,
          pageLimit: res.data.paginationMeta.pageSize
        });
      });
    } else {
      return getProducts(`page=${itemPage}`).then((res) => {
        this.setState({
          itemPage: res.data.paginationMeta.currentPage,
          totalCount: res.data.paginationMeta.totalCount,
          pageLimit: res.data.paginationMeta.pageSize
        });
      });
    }
  }

  /**
   *
   * @param {*} prevProps previous props
   * @param {*} prevState previous state
   *
   * @returns {*} item objects
   */
  componentDidUpdate(prevProps) {
    const { location, getProducts } = this.props;
    if (prevProps.location.search !== location.search) {
      const parsed = queryString.parse(location.search);
      const stringified = queryString.stringify(parsed);
      return getProducts(stringified).then((res) => {
        this.setState({
          itemPage: res.data.paginationMeta.currentPage,
          totalCount: res.data.paginationMeta.totalCount,
          pageLimit: res.data.paginationMeta.pageSize
        });
      });
    }
    if (prevProps.location.pathname !== location.pathname && location.pathname.length > 2) {
      const locationPath = location.pathname.split('/');
      const dept = locationPath[2];
      const cate = locationPath[3];
      return getProducts(`department=${dept}&category=${cate}`).then((res) => {
        this.setState({
          itemPage: res.data.paginationMeta.currentPage,
          totalCount: res.data.paginationMeta.totalCount,
          pageLimit: res.data.paginationMeta.pageSize
        });
      });
    }
  }

  /**
   * @param {*} pageNumber
   * @returns {*} new page items
   */
  handlePageChange = (pageNumber) => {
    const { location, getProducts } = this.props;
    const locationPath = location.pathname.split('/');
    if (location.search) {
      const parsed = queryString.parse(location.search);
      const stringified = queryString.stringify(parsed);
      return getProducts(`${stringified}&page=${pageNumber}`).then((res) => {
        this.setState({
          itemPage: res.data.paginationMeta.currentPage,
          totalCount: res.data.paginationMeta.totalCount,
          pageLimit: res.data.paginationMeta.pageSize
        });
      });
    } if (locationPath.length > 2) {
      const dept = locationPath[2];
      const cate = locationPath[3];
      return getProducts(`department=${dept}&category=${cate}&page=${pageNumber}`).then((res) => {
        this.setState({
          itemPage: res.data.paginationMeta.currentPage,
          totalCount: res.data.paginationMeta.totalCount,
          pageLimit: res.data.paginationMeta.pageSize
        });
      });
    } else {
      return getProducts(`page=${pageNumber}`).then((res) => {
        this.setState({
          itemPage: res.data.paginationMeta.currentPage,
          totalCount: res.data.paginationMeta.totalCount,
          pageLimit: res.data.paginationMeta.pageSize
        });
      });
    }
  }

  /**
   * @description Render the JSX template
   *
   *
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    const { location, items, history } = this.props;
    const { itemPage, pageLimit, totalCount } = this.state;
    if (items && !items.items) {
      return (
        <Loading />
      );
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>Tshirt Categories</title>
          <meta name="description"
            content="order by categories and department, french, italia, irish, christmas, valentine, animal, flower" // eslint-disable-line
          />
          <meta name="keywords" content="nature, seasonal, regional" />
        </Helmet>
        <Header history={history} />
        <ProductBanner location={location} products={items} />
        <div className="container">
          <div className="row main-content">
            <div className="col-md-9 d-flex flex-wrap">
              {items.items.map(item => (
                (
                  <div className="border-0 col-md-4 card card-body product-hover" key={item.product_id}>
                    <Link to={`/product/${item.product_id}`}>
                      <img
                        src={`${config.productUrl}/${item.thumbnail}`}
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
                    <div className="middle hidden">
                      <Link to={`/product/${item.product_id}`} className="d-flex justify-content-center">
                        <button type="button" className="register-button buy-now">Buy Now</button>
                      </Link>
                    </div>
                  </div>
                )
              ))}
              <Pagination
                activePage={itemPage}
                itemsCountPerPage={pageLimit}
                totalItemsCount={totalCount}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                activeClass="page-item active"
                hideDisabled
                itemClass="page-item"
                innerClass="pagination justify-content-center text"
                linkClass="page-link"
              />
            </div>
            <div className="col-md-3">
              <div className="row d-flex flex-wrap flex-direction-column">
                <DealItem
                  title="Hot sales"
                  mainRow="row d-flex flex-direction-column justify-content-center"
                  innerColumn="col-md-7"
                />
              </div>
            </div>

          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

ViewProducts.propTypes = {
  history: PropTypes.shape({}),
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string,
  }),
  getProducts: PropTypes.func,
  items: PropTypes.shape({})
};

const mapStateToProps = state => ({
  department: state.department,
  items: state.product,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts: getItems,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewProducts);
