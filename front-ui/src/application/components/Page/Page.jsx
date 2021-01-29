import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Page = ({ children, header, modifiers, footer }) => {
  const baseClass = 'hg-page';
  const prefixedModifiers = Array.isArray(modifiers) ? modifiers.map(modifier => `${baseClass}--${modifier}`) : [];

  const mainClass = classNames(
    baseClass,
    prefixedModifiers,
  );

  return (
    <div className={mainClass}>
      { header &&
        <div className={`${baseClass}__header`}>
          {header}
        </div>
      }
      <main className={`${baseClass}__content`}>
        {children}
      </main>
        <footer className={`${baseClass}__footer`}>
          <p>Working progres....</p>
        </footer>
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  modifiers: PropTypes.arrayOf(PropTypes.string),
};

Page.defaultProps = {
  header: null,
  footer: null,
  modifiers: [],
};

export default Page;