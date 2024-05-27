import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
  return (
    <div className="container">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default Loader;
