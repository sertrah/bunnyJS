import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const loaderSizes = {
  tiny: 'tk-loader--tiny',
  small: 'tk-loader--small',
};

const Loader = ({ modifiers, size, style }) => {
  let sizeClass = null;
  if (size !== '' && loaderSizes[size] !== undefined) {
    sizeClass = loaderSizes[size];
  }

  const baseClass = 'tk-loader';
  const prefixedModifiers = Array.isArray(modifiers) ? modifiers.map(modifier => `${baseClass}--${modifier}`) : [];

  const mainClass = classnames(
    baseClass,
    prefixedModifiers,
    sizeClass,
  );

  return (
    <div
      id="loader"
      className={mainClass}
      style={style}
    >
      <div className={`${baseClass}__icon`} />
    </div>
  );
};

Loader.defaultProps = {
  modifiers: [],
  size: '',
  style: {},
};

Loader.propTypes = {
  modifiers: PropTypes.array,
  size: PropTypes.string,
  style: PropTypes.object,
};

export default Loader;
