import React from "react";
import { Controller } from "react-hook-form";

function CInput({ id, name, errors, control, label, defaultValue, ...otherProps }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ onChange, onBlur, value }) => (
        <input
          id={id || name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={label}
          className="c-input"
          defaultValue={defaultValue}
          {...otherProps}
        />
      )}
    />
  );
}

export default CInput;
