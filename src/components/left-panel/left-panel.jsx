import React from "react";
import "./left-panel.css";

const LeftPanel = ({ onBtn }) => {
  /* const btns = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", ".", "AC"],
  ]; */
  const btns = [
    ["7", "4", "1", "0"],
    ["8", "5", "2", "."],
    ["9", "6", "3", "AC"],
  ];

  return (
    <div className="leftPanel">
      {btns.map((bt, i) => (
        <div key={i} className="numbers">
          {bt.map((b) => (
            <div
              key={b}
              onClick={onBtn}
              className={`${b === "AC" ? "ac" : ""}`}
            >
              {b}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LeftPanel;
