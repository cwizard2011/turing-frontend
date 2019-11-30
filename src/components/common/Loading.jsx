import React from 'react';
import loader from '../../images/loader.gif';

const Loading = () => (
  <div style={{ margin: 'auto auto' }}>
    <div className="loading-center text-center">
      <img src={loader} className="text mx-auto" alt="Loading..." />
    </div>
  </div>
);

export default Loading;
