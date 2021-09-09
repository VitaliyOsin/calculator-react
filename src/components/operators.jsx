import React from "react";
import { opers } from "../utils/lists";

const Operators = ({ onOpBtn }) => {
  return (
    <div className="operators">
      {opers.map((op, i) => (
        <div key={i} onClick={onOpBtn} data-sign={op.value}>
          {op.name}
        </div>
      ))}
    </div>
  );
};

export default Operators;
