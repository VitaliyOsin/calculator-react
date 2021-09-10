import React from "react";
import PropTypes from "prop-types";

import "./input.css";

const Input = ({ input }) => {
  return <div className="input">{input}</div>;
};

Input.propTypes = {
  input: PropTypes.string,
};

export default Input;
