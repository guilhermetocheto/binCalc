let runningTotal = 0;
let buffer = "0";
let previousOperator;
//let test = "101";
//let teste = 10;

const screen = document.querySelector(".screen");
var resultScreen = document.querySelector(".result-screen");

//console.log(flipBits(test));

//console.log(twoComplement(test));

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      resultScreen.innerText = "0";
      break;
    case "=":
      resultScreen.innerText = twoComplement(buffer, 8);
      previousOperator = null;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
  }
}

function twoComplement(strBuffer) {
  if (strBuffer === "0") {
    return "0";
  }
  let res = "";
  console.log("res = " + res);
  if (strBuffer.length < 8) {
    res += strBuffer.padStart(8, "0");
    console.log("res = " + res);
  }
  res = flipBits(res);
  console.log("res = " + res);
  res = sum(res, "1");
  console.log("res = " + res);
  return res;
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else if (buffer.length < 8) {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();

function sum(m, n) {
  let len = Math.max(m.length, n.length);

  m = m.padStart(len, "0");
  n = n.padStart(len, "0");
  let carry = 0;
  let res = "";

  for (i = len - 1; i >= 0; i--) {
    let mBit = +m[i];
    let nBit = +n[i];
    let sum = mBit + nBit + carry;
    carry = Math.floor(sum / 2);
    res = (sum % 2) + res; // Aqui está concatenando e não somando os valores
    //console.log(res);
  }
  return carry ? "1" + res : res;
}

function flipBits(str) {
  console.log("a string é igual a " + str);
  let finalStr = "";
  //console.log("finalStr por enquanto é igual a " + finalStr);
  for (let i = 0; i <= str.length - 1; i++) {
    if (str[i] === "0") {
      //console.log("O valor do index [" + i + "] da string é igual a " + str[i]);
      finalStr += "1";
      //console.log("finalStr agora é igual a " + finalStr);
    } else {
      //console.log("O valor do index [" + i + "] da string é igual a " + str[i]);
      finalStr += "0";
      //console.log("finalStr agora é igual a " + finalStr);
    }
  }
  console.log("finalStr ficou: " + finalStr);
  return finalStr;
}
