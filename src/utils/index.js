const step = (n) => 10 ** (n.toString().split(".")[1] || "").length;

export const calc = (num1, num2, oper) => {
  const kf = Math.max(...[step(num1), step(num2)]);
  let res;
  switch (oper) {
    case "+":
      res = (Number(num1) * kf + Number(num2) * kf) / kf;
      break;
    case "-":
      res = (Number(num1) * kf - Number(num2) * kf) / kf;
      break;
    case "*":
      res = (Number(num1) * kf * (Number(num2) * kf)) / kf ** 2;
      break;
    case "/":
      if (num2 === "0") {
        res = "E0";
        break;
      }
      res = (Number(num1) * kf) / (Number(num2) * kf);
      break;
    default:
      res = "0";
  }
  return res;
};
