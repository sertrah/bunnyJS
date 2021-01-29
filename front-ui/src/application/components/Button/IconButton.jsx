import React from "react";
import PropTypes from "prop-types";

import Button from "./Button";
import Loader from "../Loader";

const IconButton = ({ icon: MaterialIcon, linkTo, ...props }) => {
  const { color, isLoading, ...passedProps } = props;
  const size = "small";
  const modifiers = ["iconOnly", size, color];

  return (
    <Button {...passedProps} linkTo={linkTo} modifiers={modifiers}>
      {isLoading ? (
        <div className="icon-button_loader">
          <Loader size="tiny" />
        </div>
      ) : (
        <MaterialIcon style={{ fontSize: 18 }} />
      )}
    </Button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "primaryTransparent",
    "secondary",
    "secundaryTransparent",
    "nocolor",
  ]),
  isLoading: PropTypes.bool,
};

IconButton.defaultProps = {
  isLoading: false,
  color: "primary",
};

export default IconButton;
