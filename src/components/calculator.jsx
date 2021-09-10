import React from "react";
import Input from "./input/input";
import LeftPanel from "./left-panel/left-panel";
import Operators from "./operators";
import PropTypes from "prop-types";
import "./calculator.css";

const Calculator = ({ input, equalHandler, onBtn, onOpBtn }) => {
  return (
    <div className="calculator">
      <Input input={input} />
      <div className="buttons">
        <Operators onOpBtn={onOpBtn} />
        <div className="bot">
          <LeftPanel onBtn={onBtn} />
          <div className="equal" onClick={equalHandler}>
            =
          </div>
        </div>
      </div>
    </div>
  );
};

Calculator.propTypes = {
  input: PropTypes.string.isRequired,
  equalHandler: PropTypes.func.isRequired,
  onBtn: PropTypes.func.isRequired,
  onOpBtn: PropTypes.func.isRequired,
};

export default Calculator;
