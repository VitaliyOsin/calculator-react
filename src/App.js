import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Calculator from "./components/calculator";
import { calc, cutter } from "./utils";
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
      if (input === "0" || input === "" || startAgain) {
        inputHandler(target.textContent);
        setStartAgain(false);
      } else {
        inputHandler(input + target.textContent);
      }
    }
  };

  const onOpBtn = useCallback(
    (key) => {
      if (input === "0" || input === "") {
        if (key === "-") {
          inputHandler(key);
        }
      } else if (input === "-") {
        if (key === "-") {
          inputHandler("0");
        }
      } else {
        if (signFlag) {
          inputHandler(input + key);
          setSign(key);
          setSignFlag(false);
        } else {
          if (input.slice(input.length - 1) === "-" && key === "-") {
            inputHandler(`${input.slice(0, input.length - 1)}+`);
            setSign("+");
            setSignFlag(false);
          } else if (
            opers.find((v) => v.value === input[input.length - 1]) &&
            key === "-"
          ) {
            inputHandler(`${input}${key}`);
          }
        }
      }

      setCommaFlag(false);
      setStartAgain(false);
    },
    [input, signFlag]
  );

  const equalHandler = useCallback(() => {
    try {
      let arr;
      let inp = input;
      let s = "";
      if (sign) {
        if (input[0] === "-" && sign === "-") {
          s = "-";
          inp = input.slice(1);
        }

        arr = inp.split(sign);
        if (arr[1] === "") arr[1] = arr[0];
        else if (arr[0] === "") arr[0] = "0";
        arr[0] = `${s}${arr[0]}`;
      } else {
        return;
      }
      const res = calc(arr[0], arr[1], sign);

      res
        ? setInput(cutter(res.toString()))
        : setInput(isNaN(res) ? "Ой!" : cutter(res.toString()));
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
      const { key } = e;
      if (Number(key) >= 0 && Number(key) <= 9) {
        if (input === "0" || startAgain) {
          inputHandler(key);
          setStartAgain(false);
        } else {
          inputHandler(input + key);
        }
      } else if (opers.find((v) => v.value === key)) {
        onOpBtn(key);
      } else if (key === "Enter" || key === "=") {
        equalHandler();
      } else if (key === "Delete") {
        resetHandler();
      } else if (key === "Backspace") {
        setInput((prev) => {
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
    [input, commaFlag, equalHandler, startAgain, onOpBtn]
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
