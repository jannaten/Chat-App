import React from "react";

const FormInput = ({ label, type, name, value, onChange, ...otherProps }) => (
  <fieldset className="fieldset">
    <label>{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      {...otherProps}
    />
  </fieldset>
);

export default FormInput;
