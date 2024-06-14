let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

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
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(buffer);
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(buffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(strBuffer) {
  if (previousOperator === "+") {
    runningTotal = sum(runningTotal, strBuffer);
  } else if (previousOperator === "−") {
    runningTotal = minus(runningTotal, strBuffer);
  } else if (previousOperator === "×") {
    runningTotal = times(runningTotal, strBuffer);
  } else if (previousOperator === "÷") {
    runningTotal = divide(runningTotal, strBuffer);
  }
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
  let sum = parseInt(m, 2) + parseInt(n, 2);
  return sum.toString(2);
}

function minus(m, n) {
  let subtracted = parseInt(m, 2) - parseInt(n, 2);
  return subtracted.toString(2);
}

function times(m, n) {
  let multiplied = parseInt(m, 2) * parseInt(n, 2);
  return multiplied.toString(2);
}

function divide(m, n) {
  let divided = parseInt(m, 2) / parseInt(n, 2);
  return divided.toString(2);
}

/*

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
    console.log(res);
  }
  return carry ? "1" + res : res;
}

//TODO: testar se o borrowIndex vai manter o seu valor caso o loop reiniciar, senão trazer a definição do borrowIndex pra fora do loop de alguma forma
//TODO: testar se vai precisar atribuir um valor ao borrowIndex dentro do While, pois assim ele não tem seu valor reatribuído cada vez que o loop reinicia

function minus(m, n) {
  let len = Math.max(m.length, n.length);

  m = m.padStart(len, "0");
  n = n.padStart(len, "0");

  let borrowIndex = 0;
  //Resultado
  let res = "";

  for (i = len - 1; i >= 0; i--) {
    //O bit atual da string m
    let mBit = +m[i];
    //O bit atual da string n
    let nBit = +n[i];
    //Índice de onde vamos emprestar um bit
    borrowIndex = i - 1;
    //Valor do bit a ser emprestado (se borrowIndex receber um valor só lá embaixo, trocar o índice ali por i - 1)
    let borrow = +m[borrowIndex];
    //Variável para definir se algum valor foi emprestado ou não
    let borrowed = false;

    if (mBit < nBit) {
      //Talvez nessa linha que o comentário está seria o lugar ideal para atribuir um valor a borrowIndex
      while (borrow === 0) {
        borrowIndex--;
        borrow = +m[borrowIndex];
      }
      borrow -= nBit;
      res += borrow.toString();
      borrowed = true;
    } else if (borrowed && i === borrowIndex) {
      mBit = 0;
      if (nBit === 1) {
        //Talvez nessa linha que o comentário está seria o lugar ideal para atribuir um valor a borrowIndex (se for necessário)
        while (borrow === 0) {
          borrowIndex--;
          borrow = +m[borrowIndex];
        }
        borrow -= nBit;
        res += borrow.toString();
        borrowed = true;
      } else {
        mBit -= nBit;
        res += mBit;
        borrowed = false;
      }
    } else {
      mBit -= nBit;
      res += mBit;
    }
  }

  return res;
}

function multiplication(m, n) {}

function division(m, n) {}

*/
