import productReducer from '../../reducers/product';

const initialState = {
  items: null,
  item: null,
  paginationMeta: null,
  error: {}
};
const item = {
  id: 1,
  name: "Arc d'Triomphe",
  description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
  price: '14.99',
  discounted_price: '0.00',
};
const items = {
  items: [
    {
      id: 1,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
    },
    {
      id: 2,
      name: 'Triomphe',
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
    }
  ],

};
describe('Product reducer', () => {
  it('should update the state when GET_ALL_ITEMS is passed', (done) => {
    const action = {
      type: 'GET_ALL_ITEMS',
      items
    };
    const expected = {
      ...initialState,
      paginationMeta: undefined,
      items
    };
    const newState = productReducer(initialState, action);
    expect(newState).toEqual(expected);
    done();
  });
  it('should update the state when GET_SINGLE_ITEM is passed', (done) => {
    const action = {
      type: 'GET_SINGLE_ITEM',
      item
    };
    const expected = {
      ...initialState,
      item
    };
    const newState = productReducer(initialState, action);
    expect(newState).toEqual(expected);
    done();
  });
});
