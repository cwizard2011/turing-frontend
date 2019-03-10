import React from 'react';
import { shallow } from 'enzyme';
import AddToCartButton from '../../components/products/AddToCartButton';


describe('Editor component', () => {
  it('should render View Products correctly', () => {
    const wrapper = shallow(<AddToCartButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
