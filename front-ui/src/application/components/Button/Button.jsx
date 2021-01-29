import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

class Button extends Component {
  renderButton = ({ a11yLabel, linkTo, ...passedProps }) => {
    return linkTo ? (
      <Link to={linkTo}>
        <button
          type="button"
          aria-label={a11yLabel || undefined}
          ref={(button) => (this.ref = button)}
          {...passedProps}
        />
      </Link>
    ) : (
      <button
        type="button"
        aria-label={a11yLabel || undefined}
        ref={(button) => (this.ref = button)}
        {...passedProps}
      />
    );
  };

  render() {
    const {
      active,
      disabled,
      modifiers,
      location,
      className: customClassName,
      ...passedProps
    } = this.props;

    const baseClass = "hg-button";
    const prefixedModifiers = Array.isArray(modifiers)
      ? modifiers.map((modifier) => `${baseClass}--${modifier}`)
      : [];

    const className = classnames(
      customClassName,
      baseClass,
      prefixedModifiers,
      {
        [`${baseClass}--disabled`]: disabled,
        [`${baseClass}--active`]: active,
      }
    );

    return this.renderButton({
      ...passedProps,
      disabled,
      className,
    });
  }
}

Button.propTypes = {
  a11yLabel: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  modifiers: PropTypes.arrayOf(
    PropTypes.oneOf([
      "primary",
      "primaryTransparent",
      "secondary",
      "secundaryTransparent",
      "iconOnly",
      "small",
      "medium",
      "large",
      "outlined",
      "nocolor",
    ])
  ),
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  style: PropTypes.object,
};

Button.defaultProps = {
  a11yLabel: undefined,
  active: undefined,
  className: "",
  disabled: false,
  modifiers: [],
  onBlur: () => {},
  onClick: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onKeyPress: () => {},
  style: {},
};

export default Button;
