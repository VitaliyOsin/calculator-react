import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Calculator from "./components/calculator";
import { calc } from "./utils";
import { opers } from "./utils/lists.js";

function App() {
  const [input, setInput] = useState("0");
  const [signFlag, setSignFlag] = useState(true);
  const [sign, setSign] = useState("");
  const [commaFlag, setCommaFlag] = useState([true, true]);
  const [startAgain, setStartAgain] = useState(false);

  const inputHandler = (m) => {
    setInput(m);
  };

  const resetHandler = () => {
    setInput("0");
    setSignFlag(true);
    setSign("");
    setCommaFlag([true, true]);
    setStartAgain(false);
  };

  const onBtn = (e) => {
    const { target } = e;

    if (target.textContent === "AC") {
      resetHandler();
      return;
    } else if (target.textContent === ".") {
      if (commaFlag || !startAgain) {
        inputHandler(input + target.textContent);
        setCommaFlag(false);
      }
    } else {
      if (input === "0" || startAgain) {
        inputHandler(target.textContent);
        setStartAgain(false);
      } else {
        inputHandler(input + target.textContent);
      }
    }
  };

  const onOpBtn = (e) => {
    const { target } = e;
    setSignFlag(false);
    setCommaFlag(false);
    setStartAgain(false);
    if (signFlag) {
      inputHandler(input + target.dataset.sign);
      setSign(target.dataset.sign);
    }
  };

  const equalHandler = useCallback(() => {
    try {
      let arr;
      if (sign) {
        arr = input.split(sign);
        if (arr[1] === "") arr[1] = arr[0];
        else if (arr[0] === "") arr[0] = "0";
      } else {
        return;
      }
      const res = calc(arr[0], arr[1], sign);

      res
        ? setInput(res.toString())
        : setInput(isNaN(res) ? "Ой!" : res.toString());
      setCommaFlag(false);
      setSignFlag(true);
      setStartAgain(true);
      setSign("");
    } catch (err) {
      console.log("Ошибка ввода...");
      resetHandler();
      return;
    }
  }, [input, sign]);

  const handleKeys = useCallback(
    (e) => {
      console.log(e.key);
      const { key } = e;
      if (Number(key) >= 0 && Number(key) <= 9) {
        if (input === "0" || startAgain) {
          inputHandler(key);
          setStartAgain(false);
        } else {
          inputHandler(input + key);
        }
      } else if (opers.find((v) => v.value === key)) {
        setSignFlag(false);
        //setCommaFlag(true);
        setStartAgain(false);
        if (signFlag) {
          inputHandler(input + key);
          setSign(key);
        }
      } else if (key === "Enter" || key === "=") {
        equalHandler();
      } else if (key === "Delete") {
        resetHandler();
      } else if (key === "Backspace") {
        //console.log("SPLIT: ", input.split(""));
        console.log("SPLIT1: ", input);
        setInput((prev) => {
          console.log("PREV: ", prev);
          prev = prev.split("");
          prev.pop();
          return prev.join("");
        });
      } else if (key === ".") {
        if (commaFlag || !startAgain) {
          inputHandler(input + key);
        }
      }
    },
    [input, commaFlag, equalHandler, signFlag, startAgain]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeys);
    return () => {
      window.removeEventListener("keydown", handleKeys);
    };
  }, [input, handleKeys]);

  return (
    <Calculator
      input={input}
      equalHandler={equalHandler}
      onBtn={onBtn}
      onOpBtn={onOpBtn}
    />
  );
}

export default App;
