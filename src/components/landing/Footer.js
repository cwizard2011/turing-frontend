import React from 'react';
import moment from 'moment';

const Footer = () => (
  <div className="footer text-center">
    <h3>TshirtShop Inc</h3>
    <p>
    Copyright
      {' '}
      {moment().format('YYYY')}
      {' '}
&copy; All Rights Reserved. ShopMate Inc.

    </p>
  </div>
);

export default Footer;
