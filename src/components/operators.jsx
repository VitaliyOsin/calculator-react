import React from "react";
import PropTypes from "prop-types";
import { opers } from "../utils/lists";

const Operators = ({ onOpBtn }) => {
  return (
    <div className="operators">
      {opers.map((op, i) => (
        <div
          key={i}
          onClick={(e) => onOpBtn(e.target.dataset.sign)}
          data-sign={op.value}
        >
          {op.name}
        </div>
      ))}
    </div>
  );
};

Operators.propTypes = {
  onOpBtn: PropTypes.func.isRequired,
};

export default Operators;
