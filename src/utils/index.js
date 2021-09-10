const step = (n) => 10 ** (n.toString().split(".")[1] || "").length;

export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

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

export const cutter = (n) => {
  const i = n.indexOf(".");
  const l = n.length;
  if (n.indexOf("e") >= 0) {
    n = n
      .toString()
      .split("e")
      .map((v, i) => {
        if (i === 0) v = v.slice(0, 11);
        return v;
      })
      .join("e");
    return n;
  }
  if (i >= 0) {
    if (l > 14) {
      n = n.slice(0, 14);
    }
  } else if (i === -1) {
    const k = 12;
    if (l > k) {
      n = Number(n) / 10 ** (l - 1);
      n = `${n.toString().slice(0, 12)}e${l - 1}`;
    }
  }
  return n;
};
