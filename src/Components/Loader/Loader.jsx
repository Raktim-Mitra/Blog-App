// Loading.js
import React from 'react';
import './Loader.css';

const Loading = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
