import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../actions/types';
import config from '../../config/index';
import {
  getCartItem,
  addItemToCart,
  updateCartQuantity,
  deleteCart,
} from '../../actions/cart.action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const postResponse = {
  data: {
    cart: {
      buy_now: true,
      id: 1,
      product_id: '1',
      customer_id: 3,
      attribute: 'XXL,White',
      quantity: 1,
    }
  }
};

const updateResponse = {
  data: {
    cart: {
      buy_now: true,
      id: 1,
      product_id: '1',
      customer_id: 3,
      attribute: 'XXL,White',
      quantity: 3,
    }
  }
};

const getResponse = {
  data: {
    totalItems: 1,
    items: {
      rows: [
        postResponse.data.cart
      ]
    }
  }
};

describe('Request Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates ADD_CART_ITEM', (done) => {
    const itemData = {
      productId: '1',
      quantity: 2,
      attributes: ['XXL', 'White']
    };
    moxios.stubRequest(`${config.apiUrl}/cart`, {
      status: 200,
      response: postResponse.data
    });

    const expectedActions = [
      {
        type: types.ADD_CART_ITEM
      },
    ];
    const store = mockStore({});
    store.dispatch(addItemToCart(itemData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('should FETCH ALL CART ITEM', (done) => {
    moxios.stubRequest(`${config.apiUrl}/cart`, {
      status: 200,
      response: getResponse.data
    });

    const expectedActions = [
      {
        cart: getResponse.data,
        total: getResponse.data.totalItems,
        type: types.SET_TOTAL_CART_ITEM,
      }
    ];
    const store = mockStore({});
    store.dispatch(getCartItem())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('should UPDATE CART Item', (done) => {
    const id = 1;
    const item = {
      cart: {
        quantity: 3
      }
    };
    moxios.stubRequest(`${config.apiUrl}/cart/${id}`, {
      status: 200,
      response: updateResponse
    });

    const expectedActions = [
      {
        error: undefined,
        type: types.UPDATE_CART_ITEM_FAIL,
      }
    ];
    const store = mockStore({});
    store.dispatch(updateCartQuantity(id, item))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
  it('should DELETE CART Item', (done) => {
    const id = 1;
    moxios.stubRequest(`${config.apiUrl}/cart/${id}`, {
      status: 200,
      response: 'Cart item deleted'
    });

    const expectedActions = [
      {
        error: undefined,
        type: 'DELETE_CART_ITEM_FAIL',
      }
    ];
    const store = mockStore({});
    store.dispatch(deleteCart(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
