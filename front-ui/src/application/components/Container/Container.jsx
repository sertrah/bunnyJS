import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div className="hg-container">
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
};

Container.defaultProps = {
  children: null,
};

export default Container;